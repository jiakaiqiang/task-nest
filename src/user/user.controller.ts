import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './user.service';
import { CreateLoginDto } from './dto/create-user.dto';
import { UpdateLoginDto } from './dto/update-user.dto';
import { BusinessException } from 'src/common/business.exception';
import {ApiTags,ApiOperation}  from '@nestjs/swagger';
//接口分类
@ApiTags('用户')
@Controller('user')
export class LoginController {
  constructor(private readonly userService: LoginService
    
    ) {}
  @ApiOperation({
    summary: '新增用户',
  })
  @Post()
  create(@Body() createLoginDto: CreateLoginDto) {

    return this.userService.create(createLoginDto);
  }
  @ApiOperation({
    summary: '查询所有',
  })
  @Get()
  findAll() {
     
    return this.userService.findAll();
  }
 

  
  @ApiOperation({
    summary: '测试参数',
  })
  @Get('findBusinessError')

  findBusinessError() {
    const a: any = {}
    try {
     
    } catch (error) {
      throw new BusinessException('你这个参数错了')
    }
    return this.userService.findAll();
  }
  //创建接口的说明
 
  @ApiOperation({
    summary: '更新单个人信息',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.userService.update(+id, updateLoginDto);
  }
  @ApiOperation({
    summary: '删除单个人',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
 
 
  @ApiOperation({
    summary: '查询单个人的信息',
  })
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }
}
