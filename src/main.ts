import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const globalPrefix: string = 'api';
  const port: number = config.get<number>('PORT');

  app.enableCors();
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, () => {
    Logger.log(`🚀 Server ready at http://localhost:${port}/${globalPrefix}`);
  });
}
bootstrap();
