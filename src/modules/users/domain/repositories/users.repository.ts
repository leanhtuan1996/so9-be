/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IBaseInterfaceRepository } from '../../../app/interfaces';

export interface IUsersRepository extends IBaseInterfaceRepository {
  findByEmail(email: string): Promise<any>;
}
