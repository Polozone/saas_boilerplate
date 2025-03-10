import { initContract } from '@ts-rest/core';
import * as z from "zod";

const c = initContract();

export const authContract = c.router({
  signinMagicLink: {
    method: 'POST',
    path: '/auth/magiclogin',
    body: z.object({
      destination: z.string().email(),
    }),
    responses: {
      200: z.object({
        message: z.string()
      }),
      400: z.object({
        message: z.string()
      }),
    },
    summary: 'Create a post',
    metadata: { role: 'user' } as const,
  },
  signinMagicLinkCallback: {
    method: 'POST',
    path: '/auth/magiclogin/callback',
    body: z.object({
      token: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string()
      }),
    },
  },
  logout: {
    method: 'POST',
    path: '/auth/logout',
    body: z.object({
      test: z.string(),
      isValid: z.string(),
    }),
    responses: {
      201: z.object({
        message: z.string()
      }),
    },
    summary: 'Create a post',
    metadata: { role: 'user' } as const,
  },
  callbackJoinOrganization: {
    method: 'POST',
    path: '/magiclogin/joinorganization/callback',
    body: z.object({
      token: z.string(),
    }),
    responses: {
      201: z.object({
        message: z.string()
      }),
    },
    summary: 'Create a post',
    metadata: { role: 'user' } as const,
  },
});