import { UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function AuthMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('authorization', req.headers.authorization);
  const token = req.headers.authorization?.split(' ')[1];
  if (token && verifyToken(token)) {
    next();
    return true;
  }
  throw new UnauthorizedException();
}

function verifyToken(token) {
  return true;
}
