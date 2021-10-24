import { NextFunction, Request, Response } from 'express';

import { ExpressMiddlewareFunction } from './ExpressWebFramework';
import { IMiddleware } from '../../util/webFramework/framework/WebFramework';

export class ExpressGenericMiddleware
  implements IMiddleware<ExpressMiddlewareFunction>
{
  private callback: CallableFunction;
  constructor(callback: CallableFunction) {
    this.callback = callback;
  }

  public exec(): ExpressMiddlewareFunction {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const result = await this.callback(req);
        await res.status(result.statusCode).json(result.body);
      } catch (error) {
        next(error);
      }
    };
  }
}
