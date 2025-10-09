import { ApiProperty } from '@nestjs/swagger';

export class SwaggerResponse {
  @ApiProperty({
    description: 'Message',
    example: 'Lorem ipsum dolor sit amet',
  })
  message: string;
}
