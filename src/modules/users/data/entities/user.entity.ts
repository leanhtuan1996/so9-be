import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { UseDto, VirtualColumn } from '../../../app/decorators';
import { RoleType } from '../../../auth/constants';
import { AbstractEntity, IAbstractEntity } from '../../../common/entity/abstract.entity';
import { UserDto, UserDtoOptions } from '../../dto/user.dto';
import { IUserSettingsEntity, UserSettingsEntity } from './user-setting.entity';


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
  name: "users",
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
