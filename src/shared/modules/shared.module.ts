import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { MailModule } from './mail/mail.module';
import { RedisModule } from './redis/redis.module';
import { S3Module } from './s3/s3.module';
import { TranslationModule } from './translation/translation.module';

@Global()
@Module({
  imports: [ConfigModule, MailModule, RedisModule, S3Module, TranslationModule],
  exports: [ConfigModule, MailModule, RedisModule, S3Module, TranslationModule],
})
export class SharedModule {}
