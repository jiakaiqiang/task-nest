
import { RedisCacheService } from './redis-cache.service';
import {  Module } from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager'
import{redisStore} from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
     
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}