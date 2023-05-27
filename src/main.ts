import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import { config } from './app/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (config.useSentry) {
    Sentry.init({ dsn: config.sentryDsn });
  }

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(helmet());
  app.enableCors();

  await app.listen(config.apiPort, config.apiHost);
}
bootstrap();
