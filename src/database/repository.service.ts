import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipEntity, TenantEntity, UserEntity } from './entities';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(MembershipEntity)
    public readonly membership: Repository<MembershipEntity>,
    @InjectRepository(TenantEntity)
    public readonly tenant: Repository<TenantEntity>,

    @InjectRepository(UserEntity)
    public readonly user: Repository<UserEntity>,
  ) {}
}
