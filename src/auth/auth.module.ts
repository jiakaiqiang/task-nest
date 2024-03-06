import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginModule } from '../login/login.module';
import { RedisCacheModule } from 'src/redis/redis-cache.module';

@Module({
  imports:[
    JwtModule.registerAsync({
      async useFactory() {
        return {
          secretOrPrivateKey: '1AGy4bCUoECDZ4yI6h8DxHDwgj84EqStMNyab8nPChQ=', //密钥
          signOptions: { 
            expiresIn: '7d'  //过期时间
          }
        }
      }
    }),
    LoginModule,
    RedisCacheModule
   
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
