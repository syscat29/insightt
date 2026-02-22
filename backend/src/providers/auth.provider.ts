import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './drizzle.provider';
import * as schema from '../models/user.model';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  secret: process.env.AUTH_SECRET!,
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 3, // 3d
    updateAge: 60 * 60 * 24, // 1d
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  experimental: {
    joins: true,
  },
  baseURL: process.env.AUTH_URL!,
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
  ],
  advanced: {
    disableOriginCheck: true,
  },
});
