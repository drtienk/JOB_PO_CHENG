import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  APP_URL: z.string().url().default('http://localhost:3000'),
  DEFAULT_USER_EMAIL: z.string().email().default('demo@example.com')
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  APP_URL: process.env.APP_URL,
  DEFAULT_USER_EMAIL: process.env.DEFAULT_USER_EMAIL
});
