import { BaseInterfaceRepository } from 'src/core/interfaces/repository.interface';

export interface UsersRepository extends BaseInterfaceRepository {
  findByEmail(email: string): Promise<any>;
}
