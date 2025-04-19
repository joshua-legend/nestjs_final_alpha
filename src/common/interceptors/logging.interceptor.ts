import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, body, query, params } = request;
    const startTime = Date.now();

    this.logger.log(`[${method}] ${url}`);
    this.logger.debug('Request details:', {
      body,
      query,
      params,
    });

    return next.handle().pipe(
      tap({
        next: (data) => {
          const responseTime = Date.now() - startTime;
          this.logger.log(`[${method}] ${url} ${responseTime}ms`);
          this.logger.debug('Response data:', data);
        },
        error: (error) => {
          const responseTime = Date.now() - startTime;
          this.logger.error(`[${method}] ${url} ${responseTime}ms`, error.stack);
        },
      }),
    );
  }
}
