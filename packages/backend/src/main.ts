import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
  console.log("Backend is accepting request of: ", FRONTEND_URL);

  app.enableCors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  app.use(cookieParser());
  
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Backend is running on: ${await app.getUrl()}`);
}

bootstrap();
