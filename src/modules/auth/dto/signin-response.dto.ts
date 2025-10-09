import { UserEntity } from '@/database';
import { SwaggerResponse } from '@/shared/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    description: 'User information',
    type: UserEntity,
  })
  user: UserEntity;

  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}

export class SignInResponseWrapperDto extends SwaggerResponse {
  @ApiProperty({
    description: 'Sign in data',
    type: SignInResponseDto,
  })
  data: SignInResponseDto;
}
