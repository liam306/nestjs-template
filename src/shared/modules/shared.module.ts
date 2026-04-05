import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { S3Module } from './s3/s3.module';
import { TranslationModule } from './translation/translation.module';

import { MailModule } from './mail/mail.module';

@Global()
@Module({
  imports: [ConfigModule, TranslationModule, S3Module, MailModule],
  exports: [ConfigModule, TranslationModule, S3Module, MailModule],
})
export class SharedModule {}
