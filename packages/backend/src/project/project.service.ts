import { CreateProject } from '@monorepo/api-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async get(userId: string) {
    // Récupérer toutes les organizations de l'utilisateur
    const userOrganizations = await this.prisma.userOrganization.findMany({
      where: {
        userId: userId
      },
      include: {
        organization: {
          include: {
            project: true
          }
        }
      }
    });

    const projects = userOrganizations
      .map(uo => uo.organization.project)
      .filter(project => project !== null);

    return { 
      status: 200 as const, 
      body: projects 
    };
  }

  async create(ownerId: string, body: CreateProject) {

    const project = await this.prisma.project.create({
      data: {
        name: body.name || "My project",
        ownerId,
      },
    });

    const organization = await this.prisma.organization.create({
      data: {
        name: project.name + "'s organization" || "My project's organization",
        ownerId: ownerId,
        projectId: project.id,
        users: {
          create: {
            userId: ownerId,
            role: "Owner"
          }
        }
      },
    });

    const updatedProject = await this.prisma.project.update({
      where: {
        id: project.id
      },
      data: {
        organizationId: organization.id
      },
    });


    return {
      status: 201 as const,
      body: updatedProject
    };
  }
} 