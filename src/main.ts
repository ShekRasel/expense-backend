import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for multiple origins (frontend URLs)
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3002'], // Allow multiple frontend URLs
    methods: 'GET,POST,PUT,DELETE,PATCH', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
