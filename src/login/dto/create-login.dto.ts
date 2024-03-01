import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
export class CreateLoginDto {
    @ApiProperty({ example: 'admin', }) //属性示例
    @IsNotEmpty()
    username: string;
    @ApiProperty({ example: 123, })
      @IsNotEmpty()
    password: string;
    @ApiProperty({ example: 123, })
    id:number
    
}
