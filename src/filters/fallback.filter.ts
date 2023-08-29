import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { execArgv } from 'process';
@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    return res.status(500).json({
      statusCode: 500,
      createdBy: FallbackExceptionFilter.name,
      errorMessage: exception.message
        ? exception.message
        : 'Unexpected error occured',
    });
  }
}
