import { initContract } from '@ts-rest/core';
import { ProjectSchema, CreateProjectSchema } from '../types/project/project.type';
import * as z from 'zod';

const c = initContract();

export const projectContract = c.router({
  create: {
    method: 'POST',
    path: '/project/create',
    body: CreateProjectSchema,
    responses: {
      201: ProjectSchema,
      400: z.object({
        message: z.string()
      }),
      403: z.object({
        message: z.string()
      })
    },
    summary: 'Create a new project',
  },
  get: {
    method: 'GET',
    path: '/project/get',
    responses: {
      200: ProjectSchema.array(),
      403: z.object({
        message: z.string()
      }),
      404: z.object({
        message: z.string()
      })
    },
    summary: 'Create a new project',
  },
}); 