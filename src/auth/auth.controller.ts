import { Controller,Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private    authService:AuthService
    ){}

    @Post()
    getToken(){
        return this.authService.login({username:"jkq",userId:'xdsdsd'})
     }
}
