import { Injectable ,HttpException, HttpStatus,NotFoundException } from '@nestjs/common';
import { LoginService } from 'src/user/user.service';
import {JwtService } from '@nestjs/jwt';
import {RedisCacheService} from 'src/redis/redis-cache.service';

//使用动态的验证码
import * as svgCaptcha from 'svg-captcha';
@Injectable()
export class AuthService {
    constructor(
        private readonly LoginService: LoginService,
        private readonly jwtService: JwtService ,
        private readonly redisCacheService: RedisCacheService) {}

    /* 检查用户是否已存在 + 校验密码 */
    async validateUser(username: string, pwd: string) {
      const payload = { username: username,password:pwd};
        const user = await this.LoginService.findOne(username); // 获取用户

 
        if (user && user.password === pwd) {
            const { password, ...result } = user; // 剔除 password
            return {
              access_token: this.jwtService.sign(payload),
              ...result
            }; // 返回用户信息
        }
        throw new NotFoundException('用户不存在或者密码错误', '404'); //第二个参数是状态码
    }
    getCaptcha(){
      const captcha = svgCaptcha.create({
        size: 4, //验证码长度
        fontSize: 50,
        width: 110,
        height: 38,
        background: '#cc9966', //背景颜色
      })
        return { img: captcha.data };
    }

   
}

