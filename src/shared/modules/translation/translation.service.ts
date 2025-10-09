import { I18nTranslations } from '@/generated/i18n.generated';
import { Injectable } from '@nestjs/common';
import { PathImpl2 } from '@nestjs/config';
import { I18nService, TranslateOptions } from 'nestjs-i18n';

@Injectable()
export class TranslationService {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  translate(
    key: PathImpl2<I18nTranslations>,
    options?: TranslateOptions,
  ): string {
    return this.i18n.translate(key, options);
  }

  t(key: PathImpl2<I18nTranslations>, options?: TranslateOptions): string {
    return this.i18n.t(key, options);
  }
}
