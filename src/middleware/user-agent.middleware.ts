import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Optional,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function userAgent(req: Request, res: Response, next: NextFunction) {
  const ua = req.headers['user-agent'];
  console.log(ua, 'ua');
  req['ua'] = ua;

  next();
}

export class UserAgentOptions {
  accepted?: string[];
}
@Injectable()
export class userAgentMiddleware implements NestMiddleware {
  constructor(@Optional() private readonly options: UserAgentOptions) {}
  use(req: Request, res: Response, next: NextFunction) {
    const ua = req.headers['user-agent'];
    console.log(ua, 'ua');
    //req['ua'] = ua;
    console.log(this.isUserAgentAccepted(ua), 'isAllowed');
    if (!this.isUserAgentAccepted(ua)) {
      throw new ForbiddenException('not allowed');
    }
    req['ua'] = ua;
    next();
  }

  private isUserAgentAccepted(userAgent?: string) {
    if (!userAgent) return false;

    console.log(this.options?.accepted, 'options');
    const acceptedUA = this.options?.accepted || [];
    if (!acceptedUA.length) {
      console.log('accepted ua', acceptedUA);
      return true;
    }
    return acceptedUA.some((ua) =>
      userAgent.toLowerCase().includes(ua.toLowerCase()),
    );
  }
}
