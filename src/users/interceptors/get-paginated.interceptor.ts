import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import FormatHelpers from '../helpers/FormatHelpers';

@Injectable()
export class GetPaginatedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const hasPageParam = request.query.hasOwnProperty('page');

    if (!hasPageParam) return next.handle();

    return next.handle().pipe(
      map((usersData) => ({
        data: usersData[0]?.map((user) =>
          FormatHelpers.formatCreateResponse(user),
        ),
        total: usersData[1],
        count: usersData[0]?.length,
      })),
    );
  }
}
