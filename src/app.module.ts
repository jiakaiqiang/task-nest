import { Module,NestModule ,MiddlewareConsumer  } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
//引入数据库模块
import { TypeOrmModule } from "@nestjs/typeorm";

///中间见进行依赖注入
import { middleware} from './middle/middle'
import { ArtcileModule } from './artcile/artcile.module';
import {CacheModule} from '@nestjs/cache-manager'
import{redisStore} from 'cache-manager-redis-yet';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
 //jwt 模块
import { JwtModule,JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.registerAsync({
      async useFactory() {
        return {
          secret: 'jkq', //密钥
          signOptions: { 
            expiresIn: '7d'  //过期时间
          }
        }
      }
    }),

    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      

    }),
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

    LoginModule,
    
    ArtcileModule,
    
    AuthModule,
    
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule  {
  configure(consumer: MiddlewareConsumer): any {

    //加载指定的中间件为了某些路由,如果针对于一个路由采用多个中间件的形式则在 apply 内部 用逗号分隔即可
    consumer.apply(middleware).forRoutes('login')
  }

}
