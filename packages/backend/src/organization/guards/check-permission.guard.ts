import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class CheckPermissionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requesterId = request.user.id;
    const organizationId = request.body.id;
    
    const targetUser = await this.prisma.user.findUnique({
      where: { email: request.body.users?.[0]?.email }
    });

    if (!targetUser) {
      return false;
    }

    const [requester, target] = await Promise.all([
      this.prisma.userOrganization.findUnique({
        where: { 
          userId_organizationId: {
            userId: requesterId,
            organizationId
          }
        }
      }),
      this.prisma.userOrganization.findUnique({
        where: { 
          userId_organizationId: {
            userId: targetUser.id,
            organizationId
          }
        }
      })
    ]);

    if (!target) {
      throw new BadRequestException("Target user not found");
    }

    if (requester.role === Role.Member) {
      throw new ForbiddenException("Member doesn't have such permission");
    }

    if (target.role === Role.Owner) {
      throw new ForbiddenException("Owner can't be banned");
    }

    if ((requester.userId === target.userId) && requester.role === Role.Owner) {
      throw new ForbiddenException("Owner can't be banned");
    }

    if (requester?.role === Role.Admin && target.role === Role.Admin) {
      throw new ForbiddenException("Admin can't kick admin");
    }

    return true;
  }
} 