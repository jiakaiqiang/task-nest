//创建接口请求的拦截器
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';

  interface Response<T> {
    data: T;
  }

  export class  ResponseInterceptor<T> implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

        return next.handle().pipe(
            map((data)=>({ data,
                status: 0,
                extra: {},
                message: 'success',
                success: true}))
        )

    }
  }