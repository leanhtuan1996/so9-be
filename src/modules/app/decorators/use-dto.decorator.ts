import type { Constructor } from '../../../types';
import type { AbstractDto } from '../../common/dto/abstract.dto';
import type { AbstractEntity } from '../../common/entity/abstract.entity';

export function UseDto(
  dtoClass: Constructor<AbstractDto, [AbstractEntity, unknown]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
