import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import type { ValidationError } from 'class-validator';
import type { Response } from 'express';
import _ from 'lodash';

import { AppConfigService } from '../../config/config.service';
import { UnprocessEntityException } from '../exceptions';

@Catch(UnprocessEntityException)
export class UnprocessableExceptionFilter
  implements ExceptionFilter<UnprocessEntityException>
{
  constructor(
    private readonly httpAdapterHost: AbstractHttpAdapter,
    private readonly configService: AppConfigService,
  ) {}

  catch(exception: UnprocessEntityException, host: ArgumentsHost): void {
    const httpAdapter = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const r = exception.getResponse() as { message: ValidationError[] };

    const validationErrors = r.message;
    this.validationFilter(validationErrors);

    const responseBody = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: 'Your input is not valid, please check your input',
      errorCode: exception.errorCode,
      errorStack: validationErrors,
    } as Record<string, unknown>;

    if (this.configService.isDevelopment) {
      responseBody.traceBack = exception.stack;
    }

    response.status(statusCode).json(responseBody);
  }

  private validationFilter(validationErrors: ValidationError[]): void {
    for (const validationError of validationErrors) {
      const children = validationError.children;

      if (children && !_.isEmpty(children)) {
        this.validationFilter(children);

        return;
      }

      delete validationError.children;

      const constraints = validationError.constraints;

      if (!constraints) {
        return;
      }

      for (const [constraintKey, constraint] of Object.entries(constraints)) {
        // convert default messages
        if (!constraint) {
          // convert error message to error.fields.{key} syntax for i18n translation
          constraints[constraintKey] = `error.fields.${_.snakeCase(
            constraintKey,
          )}`;
        }
      }
    }
  }
}
