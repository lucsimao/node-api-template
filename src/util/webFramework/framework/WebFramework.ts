import { BaseController } from '../../../abstracts/BaseController';
import { IHttpRequest } from '../../../interfaces/IHttpRequest';
import { IHttpResponse } from '../../../interfaces/IHttpResponse';
export interface IMiddleware {
  executeMiddleware(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
export interface IWebFramework<T> {
  addMiddleware(middleware: IMiddleware): void;

  startServer(port: number, callback: () => void): void;

  get(route: string, ...webMiddlewares: T[]): void;

  post(route: string, ...webMiddlewares: T[]): void;

  closeServer(): void;

  execController(controller: BaseController): T;
}
