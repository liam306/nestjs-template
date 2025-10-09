import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({
    description: 'ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Created at',
    example: '2021-01-01T00:00:00.000Z',
    type: Date,
  })
  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2021-01-01T00:00:00.000Z',
    type: Date,
  })
  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Deleted at',
    example: '2021-01-01T00:00:00.000Z',
    required: false,
    type: Date,
  })
  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  deletedAt: Date | null;
}
