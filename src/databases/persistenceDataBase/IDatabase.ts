export interface IDatabase<T> {
  connect(): Promise<T>;
  close(): Promise<void>;
}
