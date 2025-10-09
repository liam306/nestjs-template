import { AuthenticatedRequest } from './authenticated-request.interface';

export interface IUserContext {
  req: AuthenticatedRequest;
}
