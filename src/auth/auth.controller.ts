import { Controller,Post,UseGuards ,Request,Get,Body,Headers, Session} from '@nestjs/common';
import { AuthService } from './auth.service';
//引入令牌
import {Public} from 'src/utils/custom'


@Controller('auth')
export class AuthController {
    constructor(
        private    authService:AuthService
    ){}
    //登录接口
    @Post()
    getToken(@Body() loginDto,@Headers() Headers,@Session() session){
      if(session.code==loginDto.code){
        return this.authService.validateUser(loginDto.username,loginDto.password)
      }
      else{
        throw new Error('验证码错误')
      }
   
     
       
     }
     @Get('captchaImage')
     getProfile(@Session() session){
      console.log(session,'-wewe')
       return this.authService.getCaptcha();
     }
}
