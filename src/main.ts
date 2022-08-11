import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MainAppModule } from './app/app.module';
import { AllExceptionsFilter } from './app/exceptions/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, configService));
  await app.listen(3000);
}
bootstrap();
