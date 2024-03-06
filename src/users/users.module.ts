import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
    providers: [UsersService],
    exports: [UsersService], // 导出 UsersService
})
export class UsersModule {}

