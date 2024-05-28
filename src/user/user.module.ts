import { Module } from '@nestjs/common';
import { LoginService } from './user.service';
import { LoginController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {JwtService} from '@nestjs/jwt';
import {RedisCacheModule } from '../redis/redis-cache.module';
@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [TypeOrmModule.forFeature([User]),RedisCacheModule],
  
  exports: [LoginService],

})
export class LoginModule {}
