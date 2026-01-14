import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Login} from './entities/login.entity';
import {JwtService} from '@nestjs/jwt';
// import {RedisCacheModule } from '../redis/redis-cache.module';
@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [TypeOrmModule.forFeature([Login])],
})
export class LoginModule {}
