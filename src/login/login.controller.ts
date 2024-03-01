import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { BusinessException } from 'src/common/business.exception';
import {ApiTags,ApiOperation}  from '@nestjs/swagger';
//接口分类
@ApiTags('用户')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @ApiOperation({
    summary: '新增用户',
  })
  @Post()
  create(@Body() createLoginDto: CreateLoginDto) {

    return this.loginService.create(createLoginDto);
  }
  @ApiOperation({
    summary: '查询所有',
  })
  @Get()
  findAll() {
    console.log(this.loginService.findAll(),'-wefwef')
    return this.loginService.findAll();
  }
 

  
  @ApiOperation({
    summary: '测试参数',
  })
  @Get('findBusinessError')

  findBusinessError() {
    const a: any = {}
    try {
      console.log(a.b.c)
    } catch (error) {
      throw new BusinessException('你这个参数错了')
    }
    return this.loginService.findAll();
  }
  //创建接口的说明
  @ApiOperation({
    summary: '查询单个人的信息',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }
  @ApiOperation({
    summary: '更新单个人信息',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }
  @ApiOperation({
    summary: '删除单个人',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
