import { UserRole } from '@/constants';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '../guards';
import { Roles } from './roles.decorator';

export const Auth = (...roles: UserRole[]) =>
  applyDecorators(
    ApiBearerAuth(),
    Roles(...roles),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard),
  );
