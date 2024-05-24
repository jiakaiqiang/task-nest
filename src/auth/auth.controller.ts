import { Controller,Post,UseGuards ,Request,Get,Body} from '@nestjs/common';
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
    getToken(@Body() loginDto:any){
      
        return this.authService.user(loginDto)
     }
     @Get('profile')
     getProfile(@Request() req) {
       return req.user;
     }
}
