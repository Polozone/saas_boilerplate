import { Controller, Post, UseGuards, Req, Param } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Get, Put } from '@nestjs/common';
import { organizationContract } from "@monorepo/api-types";
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { CheckPermissionGuard } from './guards/check-permission.guard';
import { AdminOrOwnerGuard } from './guards/adminOrOwner.guard';

@UseGuards(JwtAuthGuard)
@Controller("organization")
export class OrganizationController {

  constructor(
    private organizationService: OrganizationService,
  ) { }

  // invite a non-user to my organization (will automatically
  // signup them after they click the magic link)
  @Post("invite")
  @TsRestHandler(organizationContract.invite)
  async invite(@Req() req) {
    return tsRestHandler(organizationContract.invite, async ({ body }) => {
      return this.organizationService.invite(req.user, body);
    });
  }

  @Get(':id')
  @TsRestHandler(organizationContract.get)
  async getById() {
    return tsRestHandler(organizationContract.get, async ( { params } ) => {
      return this.organizationService.get(params.id)
    })
  }

  @Put()
  @UseGuards(CheckPermissionGuard, AdminOrOwnerGuard)
  @TsRestHandler(organizationContract.update)
  async update() {
    return tsRestHandler(organizationContract.update, async ({ body }) => {
      return this.organizationService.update({ id: body.id }, body);
    });
  }

  @Put('role')
  @UseGuards(CheckPermissionGuard, AdminOrOwnerGuard)
  @TsRestHandler(organizationContract.updateUserRole)
  async updateUserRole(@Req() req) {
    return tsRestHandler(organizationContract.updateUserRole, async ({ body }) => {
      return this.organizationService.update({ id: body.id }, body);
    });
  }
}
