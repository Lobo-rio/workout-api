import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  const corsOrigin = process.env.CORS_ORIGIN?.split(',').map((item) => item.trim());
  app.enableCors({
    origin: corsOrigin?.length ? corsOrigin : false,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
