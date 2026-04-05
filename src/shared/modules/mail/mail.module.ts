import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.config.get('MAIL_HOST', { infer: true }),
          port: configService.config.get('MAIL_PORT', { infer: true }),
          secure: false, // true for 465, false for other ports
          auth: {
            user: configService.config.get('MAIL_USER', { infer: true }),
            pass: configService.config.get('MAIL_PASSWORD', { infer: true }),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.config.get('MAIL_FROM', { infer: true })}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
