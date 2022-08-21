import { Inject, Injectable } from '@nestjs/common';
import type { FindOptionsWhere } from 'typeorm';

import type { UserEntity } from '../../data/entities/user.entity';
import { USERS_REPOSITORY } from '../../users.constants';
import type { CreateUserModel } from '../models/create-user.model';
import { IUsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  findById(id: number): Promise<UserEntity | undefined> {
    return this.usersRepository.findById(id);
  }

  findByIds(ids: [number]): Promise<UserEntity[]> {
    return this.usersRepository.findByIds(ids);
  }

  findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findByEmail(email);
  }

  create(data: CreateUserModel): Promise<UserEntity> {
    return this.usersRepository.create(data);
  }

  delete(id: number): Promise<boolean> {
    return this.usersRepository.delete(id);
  }

  /**
   * Find single user
   */
  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy(findData);
  }
}
