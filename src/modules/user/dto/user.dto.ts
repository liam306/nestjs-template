import { UserRole, UserStatus } from '@/constants';
import { BaseDTO } from '@/shared/dto';
import { ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('User')
export class UserDTO extends BaseDTO {
  @FilterableField(() => String)
  username: string;

  @FilterableField(() => String)
  firstname: string;

  @FilterableField(() => String)
  lastname: string;

  @FilterableField(() => String)
  phone: string;

  @FilterableField(() => String)
  email: string;

  @FilterableField(() => UserRole)
  role: UserRole;

  @FilterableField(() => UserStatus)
  status: UserStatus;
}
