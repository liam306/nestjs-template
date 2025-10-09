import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum TenantRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
}

registerEnumType(TenantRole, {
  name: 'TenantRole',
});
