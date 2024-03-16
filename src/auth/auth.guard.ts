
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
 
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
import { NoValidUrlList } from 'config';

  import { Request } from 'express';
  import {IS_PUBLIC_KEY} from 'src/utils/custom'
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,private reflector: Reflector) {
   
    }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          if (isPublic) {
            // 💡 See this condition
            return true;
          }
      





      const request = context.switchToHttp().getRequest();
      //获取urL
      const url =  request.url
    
      const token = this.extractTokenFromHeader(request);
      console.log(token,'-')
      //不需要鉴权的接口
      if(NoValidUrlList.includes(url)){
      return true
      }

      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: '1AGy4bCUoECDZ4yI6h8DxHDwgj84EqStMNyab8nPChQ='
          }
        );
        console.log(payload,'-jkq')
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        console.log('-wewe')
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }