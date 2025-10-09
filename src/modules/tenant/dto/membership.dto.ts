import { TenantRole } from '@/constants';
import { TenantEntity, UserEntity } from '@/database';
import { BaseDTO } from '@/shared/dto';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Membership')
export class MembershipDTO extends BaseDTO {
  @Field(() => ID)
  userId: number;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => ID)
  tenantId: number;

  @Field(() => TenantEntity)
  tenant: TenantEntity;

  @Field(() => TenantRole)
  role: TenantRole;
}
