import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  private readonly _usersRepository: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity) userEntity: Repository<UserEntity>,
  ) {
    this._usersRepository = userEntity;
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this._usersRepository.findOneBy({ email });
  }
  index(): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  findById(id: any): Promise<UserEntity> {
    return this._usersRepository.findOne(id);
  }
  findByIds(ids: [any]): Promise<UserEntity[]> {
    return this._usersRepository.createQueryBuilder().whereInIds(ids).getMany();
  }
  create(data: UserEntity): Promise<UserEntity> {
    return this._usersRepository.save(data);
  }
  async update(id: number, data: any): Promise<UserEntity> {
    const res = await this._usersRepository.update(id, data);
    return res.raw;
  }
  async delete(id: number): Promise<boolean> {
    const res = await this._usersRepository.delete(id);
    return res.affected > 0;
  }
}
