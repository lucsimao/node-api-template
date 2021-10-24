import {
  IMiddlewareFactory,
  IWebFramework,
} from '../../util/webFramework/framework/WebFramework';
import express, { Application, NextFunction, Request, Response } from 'express';

import { ApplicationError } from '../../util/errors/ApplicationError';
import { BaseController } from '../../abstracts/BaseController';
import { IHttpRequest } from '../../interfaces/IHttpRequest';
import Logger from '../../util/logger';
import { Server } from 'http';

export interface ExpressMiddlewareFunction {
  (req: Request, res: Response, _next: NextFunction): Promise<void>;
}

export interface ExpressErrorMiddlewareFunction {
  (
    err: ApplicationError,
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void>;
}
export default class ExpressWebFramework
  implements IWebFramework<ExpressMiddlewareFunction>
{
  private application: Application;
  private server?: Server;

  constructor() {
    this.application = express();
    this.application.use(express.json());
  }

  public startServer(port: number, callback?: () => void): void {
    this.server = this.application.listen(port, callback);
  }

  public addMiddleware(middlewareFactory: IMiddlewareFactory): void {
    const middleware = middlewareFactory.getMiddleware();
    this.application.use(middleware.exec() as ExpressMiddlewareFunction);
  }

  public addErrorMiddleware(middlewareFactory: IMiddlewareFactory): void {
    const middleware = middlewareFactory.getMiddleware();
    this.application.use(middleware.exec() as ExpressErrorMiddlewareFunction);
  }

  public async closeServer(): Promise<void> {
    await this.server?.close();
  }

  public get(
    route: string,
    ...webMiddlewares: ExpressMiddlewareFunction[]
  ): void {
    const router = express.Router();
    router.get(route, webMiddlewares);
    this.application.use(router);
  }

  public post(
    route: string,
    ...webMiddlewares: ExpressMiddlewareFunction[]
  ): void {
    const router = express.Router();
    router.post(route, webMiddlewares);
    this.application.use(router);
  }

  public execController(controller: BaseController): ExpressMiddlewareFunction {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const httpRequest = this.getHttpRequest(req);

        const httpResponse = await controller.execute(httpRequest);

        res.status(httpResponse.statusCode).json(httpResponse.body);
        Logger.info({
          msg: `${req.method} on ${req.path}`,
          method: req.method,
          status: httpResponse.statusCode,
          body: httpResponse.body,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  private getHttpRequest(req: Request): IHttpRequest {
    return {
      params: req.params,
      headers: req.headers,
      body: req.body,
    };
  }

  public getApp(): unknown {
    return this.application;
  }
}
