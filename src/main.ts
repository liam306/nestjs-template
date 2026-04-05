import './instrument';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import basicAuth from 'express-basic-auth';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { morganMiddleware } from './middleware';
import { createI18nValidationPipe } from './pipes';
import { ConfigService } from './shared/modules/config/config.service';
import { TranslationService } from './shared/modules/translation/translation.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
    },
  });

  app.use(helmet());
  app.setGlobalPrefix('api', {
    exclude: ['/health', '/docs', '/'],
  });
  app.use(compression());
  app.use(morganMiddleware);
  app.enableVersioning();

  const i18n = app.get(TranslationService);

  app.useGlobalPipes(createI18nValidationPipe(i18n));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MyMate API Documentation')
    .setDescription('API documentation for MyMate')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const { config } = app.get(ConfigService);

  app.use(
    ['/api/docs'],
    basicAuth({
      users: {
        [config.get('BASIC_AUTH_USER')!]: config.get('BASIC_AUTH_PASSWORD')!,
      },
      challenge: true,
    }),
  );

  SwaggerModule.setup('api/docs', app, document);

  const port = config.get('PORT', 3000);
  await app.listen(port);
  Logger.log(`🚀 Server is running on port ${port}`, 'Bootstrap');
}
bootstrap();
