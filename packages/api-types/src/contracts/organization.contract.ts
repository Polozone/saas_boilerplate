import { initContract } from '@ts-rest/core';
import * as z from "zod";
import { OrganizationSchema,
		 UpdateOrganizationSchema,
		//  RoleUserSchema
 } from '../types/organization/organization.type';
 import { RoleUserSchema } from '../types/user/user.type';
// type User = ClientInferResponseBody<typeof userContract.get, 200>;

const c = initContract();

export const organizationContract = c.router({
	invite: {
		method: 'POST',
		path: '/organization/invite',
		body: z.object({
			email: z.string().email(),
			organizationId: z.string().cuid(), // possibly use regex validator
		}),
		responses: {
			200: z.object({
				message: z.string()
			}),
		},
		summary: 'Invite a user to the organization',
	},
	get: {
		method: 'GET',
		path: '/organization/:id',
		pathParams: z.object({
			id: z.string(),
		}),
		responses: {
			200: OrganizationSchema,
			404: z.object({
				message: z.string()
			}),
		},
		summary: 'Get organization details',
	},
	update: {
		method: 'PUT',
		path: '/organization',
		body: UpdateOrganizationSchema,
		responses: {
			200: OrganizationSchema,
			400: z.object({ message: z.string() }),
			403: z.object({ message: z.string() }),
			404: z.object({ message: z.string() }),
		},
		summary: 'Update organization details and manage users',
	},
	updateUserRole: {
		method: 'PUT',
		path: '/organization/role',
		body: UpdateOrganizationSchema,
		responses: {
			200: OrganizationSchema,
			400: z.object({ message: z.string() }),
			403: z.object({ message: z.string() }),
			404: z.object({ message: z.string() }),
		},
		summary: 'Update user role in organization'
	},
});