import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from 'src/config/configuration';
import { validateSchema } from 'src/config/validation';
import { AuthModule } from 'src/features/auth/auth.module';
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  HttpAdapterHost,
} from '@nestjs/core';
import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { UsersModule } from 'src/features/users/users.module';
import { AuthInterceptor } from 'src/features/auth/interceptors/auth.interceptor';
import { TransformInterceptor } from '../core/interceptors/transform.interceptor';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AllExceptionsFilter } from '../core/filters/all-exception.filter';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/${
        process.env.NODE_ENV
      }.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema: validateSchema,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      inject: [HttpAdapterHost, ConfigService],
      useFactory: ({ httpAdapter }, configService) => {
        return new AllExceptionsFilter(httpAdapter, configService);
      },
    },
  ],
})
export class MainAppModule {}
