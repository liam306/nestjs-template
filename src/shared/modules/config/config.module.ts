import { Logger, Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import { ConfigService } from './config.service';
import { envSchema } from './env.schema';

@Module({
  imports: [
    Config.forRoot({
      validate: (config: Record<string, unknown>) => {
        const result = envSchema.safeParse(config);
        if (!result.success) {
          Logger.error(result.error.message, 'ConfigValidation');
          throw new Error('❌ Invalid environment variables');
        }
        return result.data;
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
