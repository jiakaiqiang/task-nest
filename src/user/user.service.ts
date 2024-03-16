import {
  HttpCode,
  HttpException,
  Injectable,
  HttpStatus,
  Inject,
  
} from '@nestjs/common';
import { CreateLoginDto } from './dto/create-user.dto';
import { UpdateLoginDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {encrypt} from '../utils/index'



import {RedisCacheService} from '../redis/redis-cache.service';

// import {BusinessException} from '../common/business.exception';
@Injectable()
export class LoginService {
  constructor(
 
    
  
    private readonly redisCacheService: RedisCacheService,
    @InjectRepository(User)  private userRepository: Repository<User>,   //这种简写可以将userRepositoy 声明和初始化同时进行
   
  ) {}

  create(createLoginDto: CreateLoginDto) {
    //存储加密后的密码
    const  password:any = encrypt(createLoginDto.password);
    //进行缓存
    this.redisCacheService.cacheSet(
      createLoginDto.username,
      password,
      60 * 60 * 24 * 7
    );
    //创建成功后然后返回jwt
     
    return this.userRepository.save(createLoginDto);
   
  }
  findAll() {
    
    return this.userRepository.find();
  }

  async findOne(id: number) {
    let result = await this.userRepository.findOneBy({ id });
   
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
    return this.userRepository.update(id, updateLoginDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
