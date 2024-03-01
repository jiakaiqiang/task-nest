import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheService } from './redis-cache.service';
import { Module, Global } from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
           isGlobal: true,
            store: redisStore,
            host: '127.0.0.1',
            port: 6379,
            db: 0, //目标库,
            auth_pass:  123456 // 密码,没有可以不写
     
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
