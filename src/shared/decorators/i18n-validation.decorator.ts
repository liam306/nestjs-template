import { applyDecorators } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export const I18nIsNotEmpty = (fieldName: string) =>
  IsNotEmpty({
    message: `validation.required:${fieldName}`,
  });

export const I18nIsEmail = (fieldName: string) =>
  IsEmail(
    {},
    {
      message: `validation.invalidEmail:${fieldName}`,
    },
  );

export const I18nIsOptionalEmail = (fieldName: string) =>
  applyDecorators(IsOptional(), I18nIsEmail(fieldName));

export const I18nIsNotEmptyEmail = (fieldName: string) =>
  applyDecorators(I18nIsNotEmpty(fieldName), I18nIsEmail(fieldName));

export const I18nIsString = (fieldName: string) =>
  IsString({
    message: `validation.mustBeString:${fieldName}`,
  });

export const I18nIsNotEmptyString = (fieldName: string) =>
  applyDecorators(I18nIsNotEmpty(fieldName), I18nIsString(fieldName));

export const I18nIsOptionalString = (fieldName: string) =>
  applyDecorators(IsOptional(), I18nIsString(fieldName));

export const I18nMinLength = (fieldName: string, min: number) =>
  MinLength(min, {
    message: `validation.minLength:${fieldName}:${min}`,
  });

export const I18nMaxLength = (fieldName: string, max: number) =>
  MaxLength(max, {
    message: `validation.maxLength:${fieldName}:${max}`,
  });
