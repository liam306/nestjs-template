import { ConfigService } from '@/shared/modules/config/config.service';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity, TenantEntity, UserEntity } from './entities';
import { RepositoryService } from './repository.service';

const entities = [MembershipEntity, TenantEntity, UserEntity];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: ({ config }: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USERNAME'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(entities),
  ],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class DatabaseModule {}
