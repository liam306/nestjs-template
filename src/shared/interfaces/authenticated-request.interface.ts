import { UserEntity } from '@/database';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: UserEntity;
}
