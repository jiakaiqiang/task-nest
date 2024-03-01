import { HttpCode, HttpException, Injectable,HttpStatus } from "@nestjs/common";
import { CreateLoginDto } from "./dto/create-login.dto";
import { UpdateLoginDto } from "./dto/update-login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Login } from "./entities/login.entity";
//引入redis的缓存
// import {RedisCacheService} from '../cache/redis-cache.service'

@Injectable()
export class LoginService {

  constructor(@InjectRepository(Login)
              private loginRepository: Repository<Login>,  //这种简写可以将loginRepositoy 声明和初始化同时进行
             // private readonly redisCacheService: RedisCacheService
              ) {
  }

  create(createLoginDto: CreateLoginDto) {
    // this.redisCacheService.cacheSet(createLoginDto.username, 'sfsdf',300000)
    return this.loginRepository.save(createLoginDto);
  }

  findAll() {

    return this.loginRepository.find();
  }

  async findOne(id: number) {
    let result  =  await  this.loginRepository.findOneBy({ id })
    console.log(result, "result");
    if(result){
      return result;
    }else{
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: new Error()
      });
    }

  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return this.loginRepository.update(id, updateLoginDto);
  }

  remove(id: number) {
    return this.loginRepository.delete(id);
  }
}
