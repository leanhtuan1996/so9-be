import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { ClassSerializerInterceptor } from '@nestjs/common';
import type { AbstractHttpAdapter } from '@nestjs/core';
import { APP_FILTER, APP_INTERCEPTOR, HttpAdapterHost } from '@nestjs/core';

import { AppConfigService } from '../config/config.service';
import {
  AllExceptionsFilter,
  QueryFailedFilter,
  UnprocessableExceptionFilter,
} from './filters';
import { TransformInterceptor } from './interceptors/transform.interceptor';

const filterServices = [
  {
    provide: APP_FILTER,
    inject: [HttpAdapterHost, AppConfigService],
    useFactory: ({ httpAdapter }, configService: AppConfigService) =>
      new AllExceptionsFilter(
        httpAdapter as AbstractHttpAdapter,
        configService,
      ),
  },
  {
    provide: APP_FILTER,
    inject: [HttpAdapterHost, AppConfigService],
    useFactory: ({ httpAdapter }, configService: AppConfigService) =>
      new UnprocessableExceptionFilter(
        httpAdapter as AbstractHttpAdapter,
        configService,
      ),
  },
  {
    provide: APP_FILTER,
    inject: [HttpAdapterHost, AppConfigService],
    useFactory: ({ httpAdapter }, configService: AppConfigService) =>
      new QueryFailedFilter(httpAdapter as AbstractHttpAdapter, configService),
  },
];

const interceptorServices = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
];

const guardServices = [];

export const providers = [
  ...filterServices,
  ...interceptorServices,
  ...guardServices,
];
