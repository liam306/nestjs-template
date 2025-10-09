import { UserRole } from '@/constants';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from '../interfaces';
import { TranslationService } from '../modules/translation/translation.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly i18n: TranslationService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRole[] | undefined>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!roles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;
    if (!roles.includes(user.role)) {
      throw new ForbiddenException({
        message: this.i18n.t('auth.forbidden'),
      });
    }

    return true;
  }
}
