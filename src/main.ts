import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainAppModule,
    new FastifyAdapter({ logger: false }),
  );

  // enable cors
  app.enableCors();

  // global prefix
  app.setGlobalPrefix('api');

  // global versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
  });

  // global helmet (https://docs.nestjs.com/security/helmet)
  await app.register(helmet);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
