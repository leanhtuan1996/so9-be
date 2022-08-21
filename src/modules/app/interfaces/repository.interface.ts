/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBaseInterfaceRepository {
  findById(id: any): Promise<any>;
  findByIds(ids: [any]): Promise<any[]>;
  create(data: any): Promise<any>;
  delete(id: any): Promise<boolean>;
}
