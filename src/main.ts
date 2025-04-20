import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './allexception/allexception.filter';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const jwtService = app.get(JwtService);

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성은 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 에러 발생
      transform: true, // 자동 타입 변환
    }),
  );

  // Enable logging
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalGuards(new JwtAuthGuard(jwtService));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
