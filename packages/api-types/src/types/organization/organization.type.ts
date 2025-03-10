import * as z from "zod";
import { RoleUserSchema } from "../user/user.type";

export const UserOrganizationSchema = z.object({
  userId: z.string(),
  organizationId: z.string(),
  role: RoleUserSchema
});

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  ownerId: z.string(),
  users: z.array(z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().nullable(),
    role: RoleUserSchema,
    organizationId: z.string()
  }))
})

export const testSchema = z.object({
  untest: z.string(),
});

export const UpdateOrganizationSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  ownerId: z.string(),
  users: z.array(z.object({
    email: z.string(),
    operation: z.enum(['update', 'disconnect']),
    data: z.object({
      role: RoleUserSchema,
      name: z.string().optional()
    }).optional()
  })).optional()
});

export type UserOrganization = z.infer<typeof UserOrganizationSchema>;
  
export type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationSchema>; 

export type Organization = z.infer<typeof OrganizationSchema>;