import { LoggerService } from '@nestjs/common';
import { BaseEntity, DeleteResult, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { IBaseService } from '../interfaces/service.interface';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;
  protected readonly logger: LoggerService;

  constructor(repository: R, logger: LoggerService) {
    this.repository = repository;
    this.logger = logger;
  }

  index(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: EntityId): Promise<T> {
    throw new Error('Method not implemented.');
  }
  findByIds(ids: [EntityId]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  create(data: any): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update(id: EntityId, data: any): Promise<T> {
    throw new Error('Method not implemented.');
  }
  delete(id: EntityId): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }
}
