import { UnprocessableEntityException } from '@nestjs/common';

export class UnprocessEntityException extends UnprocessableEntityException {

  readonly errorCode: string;

  constructor(errorCode: string, objectOrError?: string | object | any, ) {
    super(objectOrError);
    this.errorCode = errorCode;
  }
}
