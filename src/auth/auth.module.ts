import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginModule } from '../user/user.module';
import { RedisCacheModule } from 'src/redis/redis-cache.module';
import {JwtAuthStrategy} from './auth.strategy';

@Module({
  imports:[
    JwtModule.registerAsync({
      global: true,
      async useFactory() {
        return {
          secret: '1AGy4bCUoECDZ4yI6h8DxHDwgj84EqStMNyab8nPChQ=', //密钥
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
  providers: [AuthService,JwtAuthStrategy]
})
export class AuthModule {}
