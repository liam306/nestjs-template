import { I18nIsOptionalEmail, I18nIsOptionalString } from '@/shared/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { SignInDto } from './signin.dto';

export class SignUpDto extends SignInDto {
  @ApiProperty({
    description: 'Email',
    example: 'john.doe@example.com',
  })
  @I18nIsOptionalEmail('email')
  email: string;

  @ApiProperty({
    description: 'First name',
    example: 'John',
    required: false,
  })
  @I18nIsOptionalString('firstname')
  firstname: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
    required: false,
  })
  @I18nIsOptionalString('lastname')
  lastname: string;
}
