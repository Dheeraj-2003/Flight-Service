import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  //config
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  await app.listen(port);
  console.log(`App is running on PORT:${port}`);
}
bootstrap();
