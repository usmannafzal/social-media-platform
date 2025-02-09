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
export class CreateManyInterceptor
  implements NestInterceptor<CreateUserDto, Response<CreateUserDto>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<CreateUserDto>> {
    return next.handle().pipe(
      map((users) => ({
        data: users.map((user) => FormatHelpers.formatCreateResponse(user)),
      })),
    );
  }
}
