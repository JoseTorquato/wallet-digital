import { HttpStatus, NestMiddleware } from '@nestjs/common';

import { AuthService } from 'src/modules/auth/services/AuthService';
import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {
    this.use = this.use.bind(this);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    const token = headers['authorization']?.split(' ')[1];

    if (!token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Token de autenticação ausente' });
    }

    try {
      const decoded = jwt.verify(token, 'jwtSecretão');

      req['user'] = decoded;
      next();
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Token de autenticação inválido' });
    }
  }
}
