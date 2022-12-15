import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '@lib/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.apiPort, config.apiHost);
}
bootstrap();
