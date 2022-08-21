import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { FindOneOptions, FindOptionsWhere } from 'typeorm';
import { Repository } from 'typeorm';

import type { IUsersRepository } from '../../domain/repositories/users.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepositoryImpl implements IUsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  findOneBy(
    findData: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy(findData);
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findById(id: Uuid): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      id,
    } as FindOneOptions<UserEntity>);
  }

  findByIds(ids: [Uuid]): Promise<UserEntity[]> {
    return this.usersRepository.createQueryBuilder().whereInIds(ids).getMany();
  }

  create(data: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(data);
  }

  async delete(id: number): Promise<boolean> {
    const res = await this.usersRepository.delete(id);

    return res.affected ?? 0 ? true : false;
  }
}
