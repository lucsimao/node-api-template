import { Request, Response } from 'express';

import { ExpressMiddlewareFunction } from './ExpressWebFramework';
import { IMiddleware } from '../../util/webFramework/framework/WebFramework';

export class GenericMiddleware
  implements IMiddleware<ExpressMiddlewareFunction>
{
  private callback: CallableFunction;
  constructor(callback: CallableFunction) {
    this.callback = callback;
  }

  public exec(): ExpressMiddlewareFunction {
    return async (req: Request, res: Response): Promise<void> => {
      const result = await this.callback(req);
      await res.status(result.statusCode).json(result.body);
    };
  }
}
