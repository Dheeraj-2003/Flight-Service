import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionFilter } from './common/filters/exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  //Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),);

  //config
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  //Filters
  app.useGlobalFilters(new AllExceptionFilter())

  //Interceptors
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(port);
  console.log(`App is running on PORT:${port}`);
}
bootstrap();
