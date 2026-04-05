import { ISendMailOption } from '@/shared/interfaces';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendHelloWorld(email: string, name: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to NestJS Template!',
        template: './hello-world',
        context: {
          name,
        },
      });
      this.logger.log(`Email sent successfully to ${email}`);
    } catch (error: any) {
      this.logger.error(`Error sending email to ${email}`, error.stack);
      throw error;
    }
  }

  async sendEmail<T extends Record<string, unknown>>(
    options: ISendMailOption<T>,
  ) {
    try {
      await this.mailerService.sendMail({
        to: options.to,
        subject: options.subject,
        template: `./${options.template}`,
        context: options.context,
      });
      this.logger.log(`Email sent successfully to ${options.to}`);
    } catch (error: any) {
      this.logger.error(`Error sending email to ${options.to}`, error.stack);
      throw error;
    }
  }
}
