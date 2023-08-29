import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { error } from 'console';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('Triggered', JSON.stringify(exception));

    const ctx = host.switchToHttp();

    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const statusCode = exception.getStatus();

    return res.status(statusCode).json({
      status: statusCode,
      createdBy: HttpExceptionFilter.name,
      errorMessage: exception['response']['message']
        ? exception['response']['message']
        : exception.message,
    });
  }
}
