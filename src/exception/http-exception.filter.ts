import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const msg = exception.message;

    const body = {
      statusCode: status,
      timeStamp: new Date().toISOString(),
      message: msg,
      path: req.url,
    };
    this.writeLogFile(body);
    res.status(status).json(body);
  }

  private async writeLogFile(data: Record<string, any>) {
    const LOGS_DIR = join(__dirname, `${Date.now()}-log.json`);
    try {
      await writeFile(LOGS_DIR, JSON.stringify(data));
    } catch (err) {
      return;
    }
  }
}
