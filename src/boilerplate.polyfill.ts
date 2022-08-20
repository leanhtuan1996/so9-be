/* eslint-disable @typescript-eslint/naming-convention,sonarjs/cognitive-complexity */
import 'source-map-support/register';
import { AbstractDto } from './modules/common/dto/abstract.dto';

declare global {
  export type Uuid = string & { _uuidBrand: undefined };

  interface Array<T> {
    toDtos<Dto extends AbstractDto>(this: T[], options?: unknown): Dto[];
  }
}