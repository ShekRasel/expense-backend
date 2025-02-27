import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // Enable CORS for multiple origins (frontend URLs)
  app.enableCors({
    origin: ['https://expense-tracker-mu-puce.vercel.app'], // Allow multiple frontend URLs
    methods: 'GET,POST,PUT,DELETE,PATCH', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 3000;
  console.log('🚀 Server is running on port', port);

  await app.listen(port);
}

bootstrap();
