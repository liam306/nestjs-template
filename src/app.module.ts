import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SentryModule } from '@sentry/nestjs/setup';
import * as path from 'path';
import { DatabaseModule } from './database/database.module';
import { JwtDecodeMiddleware } from './middleware';
import { AuthModule } from './modules/auth/auth.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from './shared/modules/config/config.service';
import { SharedModule } from './shared/modules/shared.module';

@Module({
  imports: [
    SentryModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: ({ config }: ConfigService) => ({
        autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
        playground: false,
        introspection: config.get('NODE_ENV') === 'development',
        sortSchema: true,
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    DatabaseModule,
    AuthModule,
    TenantModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtDecodeMiddleware).forRoutes('*');
  }
}
