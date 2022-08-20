export interface IBaseInterfaceRepository {
  index(): Promise<any>;
  findById(id: any): Promise<any>;
  findByIds(ids: [any]): Promise<any[]>;
  create(data: any): Promise<any>;
  update(id: any, data: any): Promise<any>;
  delete(id: any): Promise<boolean>;
}
