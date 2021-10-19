import {
  IMiddlewareFactory,
  IWebFramework,
} from '../../util/webFramework/framework/WebFramework';
import express, { Application, Request, Response } from 'express';

import { BaseController } from '../../abstracts/BaseController';
import { IHttpRequest } from '../../interfaces/IHttpRequest';
import { RateLimit } from 'express-rate-limit';
import { Server } from 'http';

export default class ExpressWebFramework
  implements IWebFramework<(req: Request, res: Response) => Promise<void>>
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
    this.application.use(middleware.exec() as RateLimit);
  }

  public async closeServer(): Promise<void> {
    await this.server?.close();
  }

  public get(
    route: string,
    ...webMiddlewares: ((req: Request, res: Response) => Promise<void>)[]
  ): void {
    const router = express.Router();
    router.get(route, webMiddlewares);
    this.application.use(router);
  }

  public post(
    route: string,
    ...webMiddlewares: ((req: Request, res: Response) => Promise<void>)[]
  ): void {
    const router = express.Router();
    router.post(route, webMiddlewares);
    this.application.use(router);
  }

  public execController(
    controller: BaseController
  ): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const httpRequest = this.getHttpRequest(req);

      const httpResponse = await controller.execute(httpRequest);

      res.status(httpResponse.statusCode).json(httpResponse.body);
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
