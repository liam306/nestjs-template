import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType()
export abstract class BaseDTO {
  @IDField(() => ID)
  id: number;

  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt: Date | null;
}
