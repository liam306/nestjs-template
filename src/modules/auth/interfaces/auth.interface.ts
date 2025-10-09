import { UserRole } from '@/constants';

export interface JwtPayload {
  id: number;
  role: UserRole;
  username: string;
  iat?: number;
  exp?: number;
}

export interface JwtErrorInfo {
  name?: 'TokenExpiredError' | 'JsonWebTokenError' | 'NotBeforeError';
  message?: string;
  expiredAt?: Date;
}

export interface AuthError extends Error {
  status?: number;
  statusCode?: number;
}
