import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule);
  await app.listen(3000);
}
bootstrap();
