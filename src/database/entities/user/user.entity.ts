import { TableName, UserRole, UserStatus } from '@/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { MembershipEntity } from '../tenant/membership.entity';

@Entity(TableName.USER)
export class UserEntity extends BaseEntity {
  @ApiProperty({
    description: 'Username',
    example: 'user123',
  })
  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password?: string;

  @ApiProperty({
    description: 'First name',
    example: 'John',
    required: false,
  })
  @Column({ type: 'varchar', nullable: true })
  firstname: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
    required: false,
  })
  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @ApiProperty({
    description: 'Phone',
    example: '1234567890',
    required: false,
  })
  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @ApiProperty({
    description: 'Email',
    example: 'john.doe@example.com',
    required: false,
  })
  @Column({ type: 'varchar', nullable: true })
  email: string;

  @ApiProperty({
    description: 'Role',
    example: UserRole.USER,
    enum: UserRole,
    default: UserRole.USER,
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiProperty({
    description: 'Status',
    example: UserStatus.ACTIVE,
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @ApiProperty({
    description: 'Memberships',
    type: () => MembershipEntity,
    isArray: true,
    default: [],
  })
  @OneToMany(() => MembershipEntity, (membership) => membership.user)
  memberships: MembershipEntity[];
}
