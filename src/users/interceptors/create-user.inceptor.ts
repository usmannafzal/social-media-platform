import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import FormatHelpers from '../helpers/FormatHelpers';
import { CreateUserDto } from '../dtos/create-user.dto';

export interface Response<T> {
  data: T;
}

@Injectable()
export class CreateUserInterceptor
  implements NestInterceptor<CreateUserDto, Response<CreateUserDto>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<CreateUserDto>> {
    return next.handle().pipe(
      map((user) => ({
        data: FormatHelpers.formatCreateResponse(user),
      })),
    );
  }
}
