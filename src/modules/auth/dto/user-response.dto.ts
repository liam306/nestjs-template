import { UserEntity } from '@/database';
import { SwaggerResponse } from '@/shared/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto extends SwaggerResponse {
  @ApiProperty({
    description: 'User data',
    type: UserEntity,
  })
  data: UserEntity;
}
