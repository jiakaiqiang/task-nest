import {
  HttpCode,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './entities/login.entity';

//生成jwt
import { JwtService } from '@nestjs/jwt';

//引入redis的缓存

import { RedisCacheService } from '../../cache/redis-cache/redis-cache.service';
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private loginRepository: Repository<Login>, //这种简写可以将loginRepositoy 声明和初始化同时进行
    private readonly redisCacheService: RedisCacheService,
    //jwt
    //private readonly jwtService: JwtService
  ) {}

  create(createLoginDto: CreateLoginDto) {
    this.redisCacheService.cacheSet('FWFWE', 'WEWEW', 60 * 60 * 24 * 7);
    //创建成功后然后返回jwt

    return this.loginRepository.save(createLoginDto);
    //生成jwT
    // try{
    //   this.loginRepository.save(createLoginDto)
    //  return  this.jwtService.sign({id: createLoginDto.id, username: createLoginDto.username,password: createLoginDto.password})
    // }catch(e){
    //   throw new Error('错误')
    // }
  }

  findAll() {
    return this.loginRepository.find();
  }

  async findOne(id: number) {
    let result = await this.loginRepository.findOneBy({ id });
    console.log(result, 'result');
    if (result) {
      return result;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
        },
      );
    }
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return this.loginRepository.update(id, updateLoginDto);
  }

  remove(id: number) {
    return this.loginRepository.delete(id);
  }
}
