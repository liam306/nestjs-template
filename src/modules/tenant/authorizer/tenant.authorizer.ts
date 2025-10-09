import { RepositoryService, TenantEntity } from '@/database';
import { IUserContext } from '@/shared/interfaces';
import { Injectable } from '@nestjs/common';
import { Filter } from '@ptc-org/nestjs-query-core';
import { Authorizer } from '@ptc-org/nestjs-query-graphql';

@Injectable()
export class TenantAuthorizer implements Authorizer<TenantEntity> {
  constructor(private readonly repositoryService: RepositoryService) {}

  async authorize(context: IUserContext): Promise<Filter<TenantEntity>> {
    const user = context?.req?.user ?? {};
    if (!user?.id) return { id: { eq: -1 } };

    const memberships = await this.repositoryService.membership.find({
      select: ['tenantId'],
      where: { userId: user.id },
    });
    const tenantIds = memberships.map((m) => m.tenantId);
    if (tenantIds.length === 0) return { id: { eq: -1 } };

    return { id: { in: tenantIds } };
  }

  async authorizeRelation(_relationName: string, context: IUserContext) {
    return this.authorize(context);
  }
}
