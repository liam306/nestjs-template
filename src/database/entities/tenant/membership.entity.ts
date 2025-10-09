import { TableName, TenantRole } from '@/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UserEntity } from '../user/user.entity';
import { TenantEntity } from './tenant.entity';

@Entity(TableName.MEMBERSHIP)
@Index(['userId', 'tenantId'], { unique: true })
@Index(['userId'])
@Index(['tenantId'])
export class MembershipEntity extends BaseEntity {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @Column({ type: 'int' })
  userId: number;

  @ApiProperty({
    description: 'User',
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity, (user) => user.memberships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ApiProperty({
    description: 'Tenant ID',
    example: 1,
  })
  @Column({ type: 'int' })
  tenantId: number;

  @ApiProperty({
    description: 'Tenant',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.memberships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @ApiProperty({
    description: 'Role',
    example: TenantRole.MEMBER,
    enum: TenantRole,
    default: TenantRole.MEMBER,
  })
  @Column({ type: 'enum', enum: TenantRole, default: TenantRole.MEMBER })
  role: TenantRole;
}
