import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http.filter';
import { FallbackExceptionFilter } from './filters/fallback.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  //global custom exception filter
  // app.useGlobalFilters(new HttpExceptionFilter())
  //order is important

  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(9000);
}
bootstrap();
