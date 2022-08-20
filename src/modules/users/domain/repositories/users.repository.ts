import { IBaseInterfaceRepository } from "../../../app/interfaces";


export interface UsersRepository extends IBaseInterfaceRepository {
  findByEmail(email: string): Promise<any>;
  findOneBy(findData: any): Promise<any>;
}
