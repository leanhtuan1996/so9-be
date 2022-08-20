import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UseDto } from '../../../app/decorators';
import { AbstractEntity, IAbstractEntity } from '../../../common/entity/abstract.entity';
import { UserDto, UserDtoOptions } from '../../dto/user.dto';

import type { IUserEntity } from './user.entity';
import { UserEntity } from './user.entity';

export interface IUserSettingsEntity extends IAbstractEntity<UserDto> {
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  user?: IUserEntity;
}

@Entity({ name: 'user_settings' })
@UseDto(UserDto)
export class UserSettingsEntity
  extends AbstractEntity<UserDto, UserDtoOptions>
  implements IUserSettingsEntity
{
  @Column({ default: false })
  isEmailVerified?: boolean;

  @Column({ default: false })
  isPhoneVerified?: boolean;

  @Column({ type: 'uuid' })
  userId?: string;

  @OneToOne(() => UserEntity, (user) => user.settings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
