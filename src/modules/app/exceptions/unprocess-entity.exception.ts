import { UnprocessableEntityException } from '@nestjs/common';

export class UnprocessEntityException extends UnprocessableEntityException {
  readonly errorCode: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(errorCode: string, objectOrError?: string | any) {
    super(objectOrError);
    this.errorCode = errorCode;
  }
}
