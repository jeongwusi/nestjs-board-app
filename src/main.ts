import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 3000;
  await app.listen(port);
  Logger.log(`${port} 포트로 애플리케이션이 실행되었습니다.`);
}
bootstrap();
