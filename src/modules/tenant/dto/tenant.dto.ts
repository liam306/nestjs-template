import { PlanName } from '@/constants';
import { MembershipEntity } from '@/database';
import { BaseDTO } from '@/shared/dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Authorize, FilterableField } from '@ptc-org/nestjs-query-graphql';
import { TenantAuthorizer } from '../authorizer';

@ObjectType('Tenant')
@Authorize(TenantAuthorizer)
export class TenantDTO extends BaseDTO {
  @FilterableField(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @FilterableField(() => String)
  slug: string;

  @Field(() => String, { nullable: true })
  logo?: string;

  @FilterableField(() => String, { nullable: true })
  plan: PlanName;

  memberships: MembershipEntity[];
}
