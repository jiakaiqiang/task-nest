import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  cacheSet(key: string, value: string, ttl: number) {
    this.cacheManager.set(key, value,ttl);
  }

  async cacheGet(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }
}
