import { RepositoryService, UserEntity } from '@/database';
import { ConfigService } from '@/shared/modules/config/config.service';
import { TranslationService } from '@/shared/modules/translation/translation.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly repositoryService: RepositoryService,
    private readonly i18n: TranslationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.config.get('JWT_SECRET')!,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.repositoryService.user.findOneBy({
      id: payload.id,
    });
    if (!user) {
      throw new UnauthorizedException({
        message: this.i18n.t('auth.unauthorized'),
      });
    }

    delete user.password;
    return user;
  }
}
