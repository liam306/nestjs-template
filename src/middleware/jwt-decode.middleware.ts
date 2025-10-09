import { JwtPayload } from '@/modules/auth/interfaces';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JwtDecodeMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      try {
        const decoded = this.jwtService.decode(token) as JwtPayload;

        if (decoded && typeof decoded === 'object') {
          req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,
          };
        }
      } catch (error) {}
    }

    next();
  }
}
