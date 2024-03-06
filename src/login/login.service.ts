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



import {RedisCacheService} from '../redis/redis-cache.service';

// import {BusinessException} from '../common/business.exception';
@Injectable()
export class LoginService {
  constructor(
 
    
  
    private readonly redisCacheService: RedisCacheService,
    @InjectRepository(Login)  private loginRepository: Repository<Login>,   //这种简写可以将loginRepositoy 声明和初始化同时进行
   
  ) {}

  create(createLoginDto: CreateLoginDto) {
    //进行缓存
    this.redisCacheService.cacheSet(createLoginDto.username, createLoginDto.password, 60 * 60 * 24 * 7);
    //创建成功后然后返回jwt

    return this.loginRepository.save(createLoginDto);
   
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
