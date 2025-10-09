import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TranslationModule } from './translation/translation.module';

@Global()
@Module({
  imports: [ConfigModule, TranslationModule],
  exports: [ConfigModule, TranslationModule],
})
export class SharedModule {}
