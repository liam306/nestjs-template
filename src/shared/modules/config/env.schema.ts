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

  AWS_S3_REGION: z.string().nonempty(),
  AWS_S3_ACCESS_KEY_ID: z.string().nonempty(),
  AWS_S3_SECRET_ACCESS_KEY: z.string().nonempty(),
  AWS_S3_BUCKET_NAME: z.string().nonempty(),
  AWS_S3_CUSTOM_DOMAIN: z.string().optional(),
});

export type EnvVars = z.infer<typeof envSchema>;
