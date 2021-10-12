import { Request, Response } from 'express';
import rateLimiter, { RateLimit } from 'express-rate-limit';

import Env from '../../config/Env';
import { IMiddleware } from '../../util/webFramework/framework/WebFramework';

export class ExpressRateLimiter implements IMiddleware<RateLimit> {
  private callback: CallableFunction;
  constructor(callback: CallableFunction) {
    this.callback = callback;
  }

  public exec(): RateLimit {
    return rateLimiter({
      windowMs: Env.app.rateLimiter.maxInterval,
      max: Env.app.rateLimiter.maxRequests,
      keyGenerator(req: Request): string {
        return req.ip;
      },
      handler: async (req: Request, res: Response): Promise<void> => {
        const result = await this.callback(req);
        await res.status(result.statusCode).json(result.body);
      },
    });
  }
}
