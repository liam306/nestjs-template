import {
  I18nIsNotEmptyString,
  I18nIsOptionalString,
} from '@/shared/decorators';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('CreateTenantInput')
export class CreateTenantInput {
  @Field(() => String)
  @ApiProperty({
    description: 'Name',
    example: 'Tenant 1',
  })
  @I18nIsNotEmptyString('name')
  name: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    description: 'Description',
    example: 'Description of the tenant',
    required: false,
  })
  @I18nIsOptionalString('description')
  description?: string;

  @Field(() => String)
  @ApiProperty({
    description: 'Slug',
    example: 'tenant-1',
  })
  @I18nIsNotEmptyString('slug')
  slug: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    description: 'Logo',
    example: 'https://example.com/logo.png',
    required: false,
  })
  @I18nIsOptionalString('logo')
  logo?: string;
}
