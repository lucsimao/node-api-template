export interface IRepository<T> {
  create(model: T): Promise<T>;
  delete?(model: T): Promise<T>;
  update(property: Partial<T>): Promise<T>;
  findOne(property: Partial<T>): Promise<T>;
  findAll?(property: Partial<T>): Promise<T[]>;
}
