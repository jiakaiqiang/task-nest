//登录中间件 检测当前接口是否有token
import {NestMiddleware ,Injectable } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express';
@Injectable()
export  class middleware implements NestMiddleware {
use(req:Request, res:Response, next:NextFunction){
  console.log(req,'test')
  next()
 }
}
