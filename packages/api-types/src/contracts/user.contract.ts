import { initContract } from '@ts-rest/core';
import * as z from "zod";
import { UserSchema } from '../types/user/user.type';

const c = initContract();

export const userContract = c.router({
    get: {
        method: 'POST',
        path: '/organization/invite',
        body: z.object({
            email: z.string().email(),
        }),
        responses: {
            200: UserSchema,
        },
        summary: 'Invite a user to the organization',
    },
});