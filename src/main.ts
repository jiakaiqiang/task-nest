declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


//引入全局的相应拦截器
import {ResponseInterceptor} from './common/interceptors/transform.interceptors';
//引入过滤器
 import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
 import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
async function bootstrap() {
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix("api");

  const options = new DocumentBuilder()
    .setTitle("NestJS Realworld Example App")
    .setDescription("The Realworld API description")
    .setVersion("1.0")
    .setBasePath("api")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/docs", app, document);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(),new HttpExceptionFilter());
  app.enableCors() //跨域
  await app.listen(3000);
}
bootstrap();
