import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { S3Module } from './s3/s3.module';
import { TranslationModule } from './translation/translation.module';

@Global()
@Module({
  imports: [ConfigModule, TranslationModule, S3Module],
  exports: [ConfigModule, TranslationModule, S3Module],
})
export class SharedModule {}
