import { Module } from '@nestjs/common';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { ConfigService } from '../config/config.service';
import { TranslationService } from './translation.service';

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: ({ config }: ConfigService) => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: path.join(process.cwd(), 'src/i18n/'),
          watch: config.get('NODE_ENV') === 'development',
        },
        typesOutputPath: path.join(
          process.cwd(),
          'src/generated/i18n.generated.ts',
        ),
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale'] },
        AcceptLanguageResolver,
      ],
      inject: [ConfigService],
    }),
  ],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
