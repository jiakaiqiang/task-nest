import { Injectable } from '@nestjs/common';
import { LoginService } from 'src/user/user.service';
import {JwtService } from '@nestjs/jwt';
import {RedisCacheService} from 'src/redis/redis-cache.service';
@Injectable()
export class AuthService {
    constructor(
       
        private readonly jwtService: JwtService ,
        private readonly redisCacheService: RedisCacheService) {}

    /* 检查用户是否已存在 + 校验密码 */
    async validateUser(username: string, pwd: string) {
        // const user = await this.userService.findOne(username); // 获取用户
        // if (user && user.password === pwd) {
        //     const { password, ...result } = user; // 剔除 password
        //     return result; // 返回用户信息
        // }
        // return null; // 用户不存在 / 密码错误
    }

    async user(user: any) {
        // const payload = { username: user.username,password:user.password, sub: user.userId };
        // this.redisCacheService.cacheSet('jkq',this.jwtService.sign(payload),10000)
        // return {
        //   access_token: this.jwtService.sign(payload)
        // }
        return  'listee'
      }
}

