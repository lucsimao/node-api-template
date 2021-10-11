export interface IRepositoryModel<T> {
  save(model: T): Promise<T>;
  findOne(properties: Partial<T>): Promise<T | undefined>;
  updateOne(properties: Partial<T>, model: Partial<T>): Promise<T | undefined>;
  findOneByIdAndToken(userId: string, token: string): Promise<T | undefined>;
  deleteAll(): Promise<void>;
}
