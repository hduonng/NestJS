import { CallHandler, ExecutionContext, Inject, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
     constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

     intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
          // const req: Request = context.switchToHttp().getRequest<Request>();
          // const res: Response = context.switchToHttp().getResponse<Response>();

          return next.handle().pipe(
               map((data: any) => {
                    this.logger.error('debug');
                    this.logger.log('response', ResponseInterceptor.name);

                    return data;
               }),
               catchError(async (err) => {
                    throw new Error(err);
               }),
          );
     }
}
