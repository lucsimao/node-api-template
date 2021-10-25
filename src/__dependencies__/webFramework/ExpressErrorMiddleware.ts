import { NextFunction, Request, Response } from 'express';

import { Error } from 'mongoose';
import { ExpressErrorMiddlewareFunction } from './ExpressWebFramework';
import { IMiddleware } from '../../util/webFramework/framework/WebFramework';

export class ExpressErrorMiddleware
  implements IMiddleware<ExpressErrorMiddlewareFunction>
{
  private callback: CallableFunction;
  constructor(callback: CallableFunction) {
    this.callback = callback;
  }

  public exec(): ExpressErrorMiddlewareFunction {
    return async (
      error: Error,
      _: Request,
      res: Response,
      __: NextFunction
    ): Promise<void> => {
      const result = this.callback(error);
      res.status(result.statusCode || 500).json(result.body);
    };
  }
}
