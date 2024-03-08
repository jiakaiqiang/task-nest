import { Controller,Post,UseGuards ,Request,Get} from '@nestjs/common';
import { AuthService } from './auth.service';
//引入令牌
import {Public} from 'src/utils/custom'


@Controller('auth')
export class AuthController {
    constructor(
        private    authService:AuthService
    ){}

    @Post()
    getToken(){
        return this.authService.user({username:"jkq",userId:'xdsdsd'})
     }

   
     @Get('profile')
     getProfile(@Request() req) {
       return req.user;
     }
}
