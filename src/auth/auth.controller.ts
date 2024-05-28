import { Controller,Post,UseGuards ,Request,Get,Body,Headers} from '@nestjs/common';
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
    getToken(@Body() loginDto,@Headers() Headers){
   
      return this.authService.validateUser(loginDto.username,loginDto.password)
       
     }
     @Get('captchaImage')
     getProfile() {
       return this.authService.getCaptcha();
     }
}
