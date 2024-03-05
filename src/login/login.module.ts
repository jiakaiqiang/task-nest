import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Login} from './entities/login.entity';
import {JwtService} from '@nestjs/jwt';
@Module({
  controllers: [LoginController],
  providers: [LoginService,JwtService],
  imports: [TypeOrmModule.forFeature([Login])],
})
export class LoginModule {}
