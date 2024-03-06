import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService ,private readonly jwtService: JwtService ) {}

    /* 检查用户是否已存在 + 校验密码 */
    async validateUser(username: string, pwd: string) {
        const user = await this.usersService.findOne(username); // 获取用户
        if (user && user.password === pwd) {
            const { password, ...result } = user; // 剔除 password
            return result; // 返回用户信息
        }
        return null; // 用户不存在 / 密码错误
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}

