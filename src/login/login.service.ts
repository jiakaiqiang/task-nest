import { HttpCode, HttpException, Injectable,HttpStatus } from "@nestjs/common";
import { CreateLoginDto } from "./dto/create-login.dto";
import { UpdateLoginDto } from "./dto/update-login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Login } from "./entities/login.entity";

@Injectable()
export class LoginService {

  constructor(@InjectRepository(Login)
              private loginRepository: Repository<Login>) {
  }

  create(createLoginDto: CreateLoginDto) {
    console.log(createLoginDto, "createLoginDto");
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
