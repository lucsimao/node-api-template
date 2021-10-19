import { Request, Response } from 'express';

import { IMiddleware } from '../../util/webFramework/framework/WebFramework';

export class GenericMiddleware
  implements IMiddleware<(req: Request, res: Response) => Promise<void>>
{
  private callback: CallableFunction;
  constructor(callback: CallableFunction) {
    this.callback = callback;
  }

  public exec(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response): Promise<void> => {
      const result = await this.callback(req);
      await res.status(result.statusCode).json(result.body);
    };
  }
}
