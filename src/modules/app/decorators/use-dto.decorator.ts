import { Constructor } from "../../../types";
import { AbstractDto } from "../../common/dto/abstract.dto";
import { AbstractEntity } from "../../common/entity/abstract.entity";


export function UseDto(
  dtoClass: Constructor<AbstractDto, [AbstractEntity, unknown]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
