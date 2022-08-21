import { Column, Entity, OneToOne } from 'typeorm';

import { UseDto, VirtualColumn } from '../../../app/decorators';
import { RoleType } from '../../../auth/constants';
import type { IAbstractEntity } from '../../../common/entity/abstract.entity';
import { AbstractEntity } from '../../../common/entity/abstract.entity';
import type { UserDtoOptions } from '../../dto/user.dto';
import { UserDto } from '../../dto/user.dto';
import type { IUserSettingsEntity } from './user-setting.entity';
import { UserSettingsEntity } from './user-setting.entity';

export interface IUserEntity extends IAbstractEntity<UserDto> {
  firstName?: string;

  lastName?: string;

  role: RoleType;

  email?: string;

  password?: string;

  phone?: string;

  avatar?: string;

  fullName?: string;

  settings?: IUserSettingsEntity;
}

@Entity({
  name: 'users',
})
@UseDto(UserDto)
export class UserEntity
  extends AbstractEntity<UserDto, UserDtoOptions>
  implements IUserEntity
{
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @VirtualColumn()
  fullName?: string;

  @OneToOne(() => UserSettingsEntity, (userSettings) => userSettings.user)
  settings?: UserSettingsEntity;
}
