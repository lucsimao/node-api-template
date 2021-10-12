import { BaseController } from '../../../abstracts/BaseController';

export interface IMiddleware<T> {
  exec(): T;
}

export interface IMiddlewareFactory {
  getMiddleware(): IMiddleware<unknown>;
}

export interface IWebFramework<T> {
  addMiddleware(middleware: IMiddlewareFactory): void;

  startServer(port: number, callback: () => void): void;

  get(route: string, ...webMiddlewares: T[]): void;

  post(route: string, ...webMiddlewares: T[]): void;

  closeServer(): void;

  execController(controller: BaseController): T;
}
