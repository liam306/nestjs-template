import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().min(1),

  DATABASE_HOST: z.string().nonempty(),
  DATABASE_PORT: z.coerce.number().min(1),
  DATABASE_USERNAME: z.string().nonempty(),
  DATABASE_PASSWORD: z.string().nonempty(),
  DATABASE_NAME: z.string().nonempty(),

  REDIS_HOST: z.string().nonempty(),
  REDIS_PORT: z.coerce.number().min(1),

  JWT_SECRET: z.string().nonempty(),
  JWT_EXPIRES_IN: z.string().nonempty(),

  BASIC_AUTH_USER: z.string().nonempty(),
  BASIC_AUTH_PASSWORD: z.string().nonempty(),
});

export type EnvVars = z.infer<typeof envSchema>;
