/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { ApplicationError } from '../../util/errors/ApplicationError';
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
      req: Request,
      res: Response,
      _: NextFunction
    ): Promise<void> => {
      const result = this.callback(error as ApplicationError);
      res.status(result.statusCode || 500).json(result.body);
    };
  }
}
