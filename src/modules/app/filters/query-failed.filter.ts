import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, Reflector } from '@nestjs/core';
import type { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { AppConfigService } from '../../config/config.service';

import { constraintErrors } from './constraint-errors.filter';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter<QueryFailedError> {
  constructor(
    private readonly httpAdapterHost: AbstractHttpAdapter,
    private readonly configService: AppConfigService,
  ) { }

  catch(
    exception: QueryFailedError & { constraint?: string },
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const httpAdapter = this.httpAdapterHost;
    
    const status = exception.constraint?.startsWith('UQ')
      ? HttpStatus.CONFLICT
      : HttpStatus.INTERNAL_SERVER_ERROR;
    
    var message = exception.message;

    if (exception.constraint?.startsWith('UQ')) {
      message = 'This email is already in use';
    }
    
    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: message
    };

    if (this.configService.isDevelopment) {
      responseBody['traceBack'] = exception.stack;
    }
    response.status(status).json(responseBody);
  }
}
