export interface ISchemaObject<T> {
  [key: string]: T;
}

export interface ISchema<T> {
  object(schemaObject: ISchemaObject<T>): T;
  string(): T;
  number(): T;
  email?(): T;
  required?(): T;
  positive?(): T;
  integer?(): T;
  array?(schemaObject: T): T;
}
