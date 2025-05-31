import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  try {
    const port = process.env.API_PORT || 9000;
    await app.listen(port);
    console.log(`Running on port ${port}`);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
