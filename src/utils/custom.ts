import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic'; //元数据键
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);  //装饰器本身