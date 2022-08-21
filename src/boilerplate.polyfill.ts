/* eslint-disable @typescript-eslint/naming-convention,sonarjs/cognitive-complexity,@moneteam/nestjs/injectable-should-be-provided */
import 'source-map-support/register';

import type { AbstractDto } from './modules/common/dto/abstract.dto';

declare global {
  export type Uuid = string & { _uuidBrand: undefined };

  interface Array<T> {
    toDtos<Dto extends AbstractDto>(this: T[], options?: unknown): Dto[];
  }
}
