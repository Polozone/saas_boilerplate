import { Controller, UseGuards, Req, Post, Get } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { projectContract } from '@monorepo/api-types';

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  @TsRestHandler(projectContract.create)
  async create(@Req() req) {
    return tsRestHandler(projectContract.create, async ({ body }) => {
      return this.projectService.create(req.user.id, body);
    });
  }

  @Get('get')
  @TsRestHandler(projectContract.create)
  async get(@Req() req) {
    return tsRestHandler(projectContract.create, async () => {
      return this.projectService.get(req.user.id);
    });
  }
} 