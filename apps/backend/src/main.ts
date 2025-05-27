import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common/pipes';
import { LoggerService } from './core/logger/logger.service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      origin: process.env.WEB_URL,
      credentials: true,
    },
  });
  app.use(cookieParser());
  app.useLogger(app.get(LoggerService));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
  const host = `0.0.0.0`;
  await app.listen(port, host);
}
bootstrap();
