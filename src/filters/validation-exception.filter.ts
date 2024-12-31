import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as any;

    const errors = {};
    errorResponse.message.forEach((msg: string) => {
      const [field, ...errorParts] = msg.split(' ');
      errors[field] = errors[field] || [];
      errors[field].push(errorParts.join(' '));
    });

    response.status(status).json({
      statusCode: status,
      error: 'Bad Request',
      message: errors,
    });
  }
}
