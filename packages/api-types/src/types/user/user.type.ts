import * as z from "zod"

export const RoleUserSchema = z.enum(["Member", "Admin", "Owner"]).default("Member");
export type RoleUser = z.infer<typeof RoleUserSchema>;

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().nullable(),
    role: RoleUserSchema,
    // organizations: z.array(UserOrganizationSchema),
    // ownedOrganizations: z.array(OrganizationSchema),
});

export type User = z.infer<typeof UserSchema>;
