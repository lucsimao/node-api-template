import { IController } from '../../../interfaces/IController';

export interface IWebFramework<T> {
  addMiddleware(middleware: T): void;

  startServer(port: number, callback: () => void): void;

  get(route: string, ...webMiddlewares: T[]): void;

  post(route: string, ...webMiddlewares: T[]): void;

  closeServer(): void;

  execController(controller: IController): T;
}
