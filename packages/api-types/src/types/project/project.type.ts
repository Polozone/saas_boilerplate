import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  organizationId: z.string(),
});

export const CreateProjectSchema = z.object({
  name: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type CreateProject = z.infer<typeof CreateProjectSchema>; 