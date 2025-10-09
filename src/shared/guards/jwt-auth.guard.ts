import { UserEntity } from '@/database';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthError, JwtErrorInfo } from '../../modules/auth/interfaces';
import { TranslationService } from '../modules/translation/translation.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly i18n: TranslationService) {
    super();
  }

  handleRequest<TUser = UserEntity>(
    err: AuthError | null,
    user: TUser | false,
    info: JwtErrorInfo | string,
  ): TUser {
    if (err?.message) this.logger.error(err.message);

    if (err || !user) {
      const isObj = typeof info === 'object' && info !== null;
      const isExpired = isObj && info.name === 'TokenExpiredError';
      const isInvalid = isObj && info.name === 'JsonWebTokenError';

      if (isExpired) {
        throw new UnauthorizedException({
          message: this.i18n.t('auth.tokenExpired'),
        });
      }
      if (isInvalid || err) {
        throw new UnauthorizedException({
          message: this.i18n.t('auth.tokenInvalid'),
        });
      }
      throw new UnauthorizedException({
        message: this.i18n.t('auth.unauthorized'),
      });
    }

    return user as TUser;
  }
}
