import {
  IMiddleware,
  IWebFramework,
} from '../../util/webFramework/framework/WebFramework';
import express, { Application, Request, Response, Router } from 'express';

import { BaseController } from '../../abstracts/BaseController';
import { IHttpRequest } from '../../interfaces/IHttpRequest';
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

  public startServer(port: number, callback: () => void): void {
    this.server = this.application.listen(port, callback);
  }

  public addMiddleware(middleware: IMiddleware): void {
    const expressMiddleware = async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const result = await middleware.executeMiddleware(req);
      await res.status(result.statusCode).json(result.body);
    };
    this.application.use(expressMiddleware);
  }

  public async closeServer(): Promise<void> {
    await this.server?.close();
  }

  public get(
    route: string,
    ...webMiddlewares: ((req: Request, res: Response) => Promise<void>)[]
  ): void {
    const router = Router();
    router.get(route, webMiddlewares);
    this.application.use(router);
  }

  public post(
    route: string,
    ...webMiddlewares: ((req: Request, res: Response) => Promise<void>)[]
  ): void {
    const router = Router();
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
