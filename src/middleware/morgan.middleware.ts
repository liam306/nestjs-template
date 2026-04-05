import { AuthenticatedRequest } from '@/shared/interfaces';
import morgan from 'morgan';

morgan.token<AuthenticatedRequest>('username', (req) => {
  if (req.user && req.user.username) {
    return req.user.username;
  }
  return 'anonymous';
});

morgan.token<AuthenticatedRequest>('user-id', (req) => {
  if (req.user && req.user.id) {
    return req.user.id.toString();
  }
  return 'anonymous';
});

morgan.token<AuthenticatedRequest>('user-role', (req) => {
  if (req.user && req.user.role) {
    return req.user.role;
  }
  return 'anonymous';
});

const customFormat =
  ':remote-addr - :username (ID::user-id, Role::user-role) [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

export const morganMiddleware = morgan(customFormat);
