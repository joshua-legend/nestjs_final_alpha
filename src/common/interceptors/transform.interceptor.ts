import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../types/response.type';
import { RESPONSE_CODE, RESPONSE_MESSAGE } from '../constants/response-code.constant';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        code: RESPONSE_CODE.SUCCESS,
        message: RESPONSE_MESSAGE[RESPONSE_CODE.SUCCESS],
        data: data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
