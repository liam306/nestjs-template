import { PlanName, TableName } from '@/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { MembershipEntity } from './membership.entity';

@Entity(TableName.TENANT)
export class TenantEntity extends BaseEntity {
  @ApiProperty({
    description: 'Name',
    example: 'Tenant 1',
  })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({
    description: 'Description',
    example: 'Description of the tenant',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: 'Slug',
    example: 'tenant-1',
  })
  @Column({ type: 'varchar', unique: true })
  slug: string;

  @ApiProperty({
    description: 'Logo',
    example: 'https://example.com/logo.png',
    required: false,
  })
  @Column({ type: 'varchar', nullable: true })
  logo?: string;

  @ApiProperty({
    description: 'Plan',
    example: PlanName.FREE,
    enum: PlanName,
    default: PlanName.FREE,
  })
  @Column({ type: 'enum', enum: PlanName, default: PlanName.FREE })
  plan: PlanName;

  @ApiProperty({
    description: 'Memberships',
    type: () => MembershipEntity,
    isArray: true,
    default: [],
  })
  @OneToMany(() => MembershipEntity, (membership) => membership.tenant)
  memberships: MembershipEntity[];
}
