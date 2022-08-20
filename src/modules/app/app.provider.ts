import { LoggingInterceptor } from "@algoan/nestjs-logging-interceptor";
import { APP_FILTER, APP_INTERCEPTOR, HttpAdapterHost } from "@nestjs/core";
import { AllExceptionsFilter, QueryFailedFilter, UnprocessableExceptionFilter } from "./filters";
import { AuthInterceptor } from "../auth/interceptors";
import { AppConfigService } from "../config/config.service";
import { TransformInterceptor } from "./interceptors/transform.interceptor";
import { ClassSerializerInterceptor } from "@nestjs/common";

const filterServices = [{
  provide: APP_FILTER,
  inject: [HttpAdapterHost, AppConfigService],
  useFactory: ({ httpAdapter }, configService) => {
    return new AllExceptionsFilter(httpAdapter, configService);
  },
  },
  {
    provide: APP_FILTER,
    inject: [HttpAdapterHost, AppConfigService],
    useFactory: ({ httpAdapter }, configService) => {
      return new UnprocessableExceptionFilter(httpAdapter, configService);
    },
  },
  {
    provide: APP_FILTER,
    inject: [HttpAdapterHost, AppConfigService],
    useFactory: ({ httpAdapter }, configService) => {
      return new QueryFailedFilter(httpAdapter, configService);
    },
  },
]

const interceptorServices = [
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
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
]

const guardServices = []

export const providers = [...filterServices, ...interceptorServices, ...guardServices];