import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
//引入数据库模块
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      connectorPackage: "mysql2",
      //autoLoadEntities: true, //自动加载实体
      retryAttempts:8,//尝试连接数据库的次数
      retryDelay:2000,//重试连接的次数
      host: "127.0.0.1",
      port: 3306, // 端口号
      username: "root", // 用户名
      password: "123456", // 密码
      database: "test", //数据库名
      synchronize: true, //是否自动同步实体文件,生产环境建议关闭
      entities: ['dist/**/*.entity{.ts,.js}'],
      
    }),

    LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
