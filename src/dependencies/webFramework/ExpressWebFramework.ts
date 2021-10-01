import express, { Application, Request, Response, Router } from 'express';

import { IController } from '../../interfaces/IController';
import { IHttpRequest } from '../../interfaces/IHttpRequest';
import { IWebFramework } from '../../util/webFramework/framework/WebFramework';

export default class ExpressWebFramework
  implements IWebFramework<(req: Request, res: Response) => Promise<void>>
{
  private application: Application;

  constructor() {
    this.application = express();
  }

  public startServer(port: number, callback: () => void): void {
    this.application.listen(port, callback);
  }

  public addMiddleware(
    middleware: (req: Request, res: Response) => Promise<void>
  ): void {
    this.application.use(middleware);
  }

  public closeServer(): void {
    throw new Error('Method not implemented.');
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
    controller: IController
  ): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const httpRequest = this.getHttpRequest(req);

      const httpResponse = await controller.executeRoute(httpRequest);

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
}
