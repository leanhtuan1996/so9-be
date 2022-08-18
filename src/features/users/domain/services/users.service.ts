import { Inject, Injectable } from '@nestjs/common';
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

  async findById(id: number) {
    return await this._usersRepository.findById(id);
  }

  async findByIds(ids: [number]) {
    return await this._usersRepository.findByIds(ids);
  }

  async findByEmail(email: string) {
    return await this._usersRepository.findByEmail(email);
  }

  async create(data: CreateUserModel) {
    return await this._usersRepository.create(data);
  }

  async update(id: number, data: UpdateUserModel) {
    return await this._usersRepository.update(id, data);
  }

  async delete(id: number) {
    return await this._usersRepository.delete(id);
  }
}
