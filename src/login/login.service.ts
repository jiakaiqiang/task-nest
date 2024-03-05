import {
  HttpCode,
  HttpException,
  Injectable,
  HttpStatus,
  Inject,
  
} from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './entities/login.entity';

//生成jwt
import { JwtService } from '@nestjs/jwt';

import { Cache } from 'cache-manager';

import {BusinessException} from '../common/business.exception';
@Injectable()
export class LoginService {
  constructor(
     //jwt
    
    private jwtService: JwtService,
    @InjectRepository(Login)  private loginRepository: Repository<Login>,
    //这种简写可以将loginRepositoy 声明和初始化同时进行
    @Inject('CACHE_MANAGER') private readonly redisCacheService: Cache,
   
   
  ) {}

  getToken(){
    let info =  {username:'jkq',password: 123}
    const token  = this.jwtService.sign(info)
    console.log(token,'toe')
   
   return '---'
  }

  create(createLoginDto: CreateLoginDto) {
    //进行缓存
  
    this.redisCacheService.set(createLoginDto.username, createLoginDto.password, 60 * 60 * 24 * 7);
    //创建成功后然后返回jwt

    //return this.loginRepository.save(createLoginDto);
    //生成jwT
    //this.loginRepository.save(createLoginDto)
    console.log(this.jwtService,'=wef')
    let info =  {username:'jkq',password: 123}
    const token  = this.jwtService.sign(info)
    console.log(token,'toe')
   
   return token
    // try{
    //   this.loginRepository.save(createLoginDto)
    //   const token  = this.jwtService.sign({username:'jkq',password: 123})
     
    //  return token
    // }catch(e){
    //   throw new BusinessException('你这个参数错了')
    // }
  }

  findAll() {
    
    return this.loginRepository.find();
  }

  async findOne(id: number) {
    let result = await this.loginRepository.findOneBy({ id });
   
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
