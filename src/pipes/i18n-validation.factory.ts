import { I18nTranslations } from '@/generated/i18n.generated';
import { TranslationService } from '@/shared/modules/translation/translation.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { PathImpl2 } from '@nestjs/config';

export const createI18nValidationPipe = (i18n: TranslationService) => {
  return new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const messages = errors.map((error) => {
        const constraints = error.constraints;
        if (constraints) {
          const constraintKeys = Object.keys(constraints);
          const firstConstraint = constraintKeys[0];
          const fieldName = error.property;

          const message = constraints[firstConstraint];
          if (message && message.includes('validation.')) {
            const parts = message.split(':');
            const i18nKey = parts[0] as PathImpl2<I18nTranslations>;
            const args: Record<string, string> = {
              field: parts[1] || fieldName,
            };

            if (parts.length > 2) {
              if (i18nKey === 'validation.minLength') {
                args.min = parts[2];
              } else if (i18nKey === 'validation.maxLength') {
                args.max = parts[2];
              }
            }

            return i18n.t(i18nKey, { args });
          }

          const i18nKey = mapConstraintToI18nKey(firstConstraint);
          return i18n.t(i18nKey, {
            args: { field: fieldName },
          });
        }
        return (
          error.constraints?.[Object.keys(error.constraints)[0]] ||
          'Validation failed'
        );
      });

      return new BadRequestException({
        message: messages[0],
      });
    },
  });
};

const mapConstraintToI18nKey = (
  constraint: string,
): PathImpl2<I18nTranslations> => {
  const constraintMap: Record<string, PathImpl2<I18nTranslations>> = {
    isNotEmpty: 'validation.required',
    isString: 'validation.mustBeString',
    isNumber: 'validation.mustBeNumber',
    isBoolean: 'validation.mustBeBoolean',
    isEmail: 'validation.invalidEmail',
    minLength: 'validation.minLength',
    maxLength: 'validation.maxLength',
    isOptional: 'validation.required',
  };

  return constraintMap[constraint] || 'validation.invalidFormat';
};
