//请求异常拦截器
import { Response, Request } from "express";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { BusinessException } from "../business.exception";
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
  // 处理业务异常  如果返回的自定义异常是 BusinessException的实例的话
  if (exception instanceof BusinessException) {
    const error = exception.getResponse(); //回去响应抛出的异常结果  调用的HttpException  源码中的getResponse()方法 该方法直接返回的是this 则是exception 本身
    response.status(HttpStatus.OK).json({
      data: null,
      status: error['code'],
      extra: {},
      message: error['message'],
      success: false,
    });
    return;
  }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse(),
    });
  }
}