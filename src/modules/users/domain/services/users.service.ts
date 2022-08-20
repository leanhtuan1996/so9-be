import { Inject, Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { UserEntity } from '../../data/entities/user.entity';
import { USERS_REPOSITORY } from '../../users.constants';
import { CreateUserModel } from '../models/create-user.model';
import { UpdateUserModel } from '../models/update-user.model';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  private readonly _usersRepository: UsersRepository;

  constructor(@Inject(USERS_REPOSITORY) usersRepository: UsersRepository) {
    this._usersRepository = usersRepository;
  }

  async findById(id: number): Promise<UserEntity | undefined> {    
    return await this._usersRepository.findById(id);
  }

  async findByIds(ids: [number]): Promise<UserEntity[]> {
    return await this._usersRepository.findByIds(ids);
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this._usersRepository.findByEmail(email);
  }

  async create(data: CreateUserModel): Promise<UserEntity> {
    return await this._usersRepository.create(data);
  }

  async update(id: number, data: UpdateUserModel): Promise<UserEntity> {
    return await this._usersRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return await this._usersRepository.delete(id);
  }

  /**
   * Find single user
   */
   findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this._usersRepository.findOneBy(findData);
  }
}
