import { TenantRole } from '@/constants';
import { RepositoryService, TenantEntity } from '@/database';
import { IUserContext } from '@/shared/interfaces';
import { TranslationService } from '@/shared/modules/translation/translation.service';
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { QueryService } from '@ptc-org/nestjs-query-core';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';

@QueryService(TenantEntity)
export class TenantService extends TypeOrmQueryService<TenantEntity> {
  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly i18n: TranslationService,
    @Inject(REQUEST) private readonly request: IUserContext,
  ) {
    super(repositoryService.tenant);
  }

  override async createOne(dto: Partial<TenantEntity>): Promise<TenantEntity> {
    const userId = this.request?.req?.user?.id;
    if (!userId)
      throw new UnauthorizedException({
        message: this.i18n.t('auth.unauthorized'),
      });

    const slugExist = await this.repositoryService.tenant.findOne({
      where: {
        slug: dto.slug,
      },
    });
    if (slugExist)
      throw new BadRequestException({
        message: this.i18n.t('tenant.slug_exist'),
      });

    const tenant = await this.repositoryService.tenant.save(dto);
    await this.repositoryService.membership.save({
      tenantId: tenant.id,
      userId,
      role: TenantRole.OWNER,
    });

    return tenant;
  }
}
