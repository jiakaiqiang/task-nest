import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from 'src/user/entities/user.entity';





@Injectable()
// 验证请求头中的token
export  class JwtAuthStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor() {
        console.log('wfwfw')
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '1AGy4bCUoECDZ4yI6h8DxHDwgj84EqStMNyab8nPChQ='
        })
    }

    async validate(payload: User) {
        console.log(payload.username);
        const { username } = payload
        return {
            username
        }
    }
}
