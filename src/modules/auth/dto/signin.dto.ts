import { I18nIsNotEmptyString } from '@/shared/decorators';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: 'Username',
    example: 'user123',
  })
  @I18nIsNotEmptyString('username')
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'password123',
  })
  @I18nIsNotEmptyString('password')
  password: string;
}
