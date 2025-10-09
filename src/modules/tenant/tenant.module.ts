import { MembershipEntity, TenantEntity } from '@/database';
import { GqlAuthGuard } from '@/shared/guards';
import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CreateTenantInput, TenantDTO } from './dto';
import { TenantService } from './tenant.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([MembershipEntity, TenantEntity]),
      ],
      services: [TenantService],
      resolvers: [
        {
          EntityClass: TenantEntity,
          DTOClass: TenantDTO,
          ServiceClass: TenantService,
          CreateDTOClass: CreateTenantInput,
          pagingStrategy: PagingStrategies.OFFSET,
          enableAggregate: true,
          enableTotalCount: true,
          guards: [GqlAuthGuard],
          interceptors: [],

          create: {
            many: { disabled: true },
          },
          update: {
            many: { disabled: true },
          },
          delete: {
            disabled: true,
          },
        },
      ],
    }),
  ],
  providers: [],
  exports: [],
})
export class TenantModule {}
