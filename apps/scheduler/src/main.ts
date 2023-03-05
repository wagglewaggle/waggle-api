import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '@lib/config';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (config.useSentry) {
    Sentry.init({ dsn: config.sentryDsn });
  }

  await app.listen(config.schedulerPort, config.schedulerHost);
}
bootstrap();
