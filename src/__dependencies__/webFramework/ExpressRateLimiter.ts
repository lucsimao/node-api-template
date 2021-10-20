import { Request, Response } from 'express';
import rateLimiter, { Options, RateLimit } from 'express-rate-limit';

import Env from '../../config/Env';
import { IMiddleware } from '../../util/webFramework/framework/WebFramework';

export class RateLimiterService {
  public static getRateLimiterParams(callback: CallableFunction): Options {
    return {
      windowMs: Env.app.rateLimiter.maxInterval,
      max: Env.app.rateLimiter.maxRequests,
      keyGenerator(req: Request): string {
        return req.ip;
      },
      handler: async (req: Request, res: Response): Promise<void> => {
        const result = await callback(req);
        await res.status(result.statusCode).json(result.body);
      },
    };
  }
}

export class ExpressRateLimiter implements IMiddleware<RateLimit> {
  private callback: CallableFunction;
  constructor(callback: CallableFunction) {
    this.callback = callback;
  }

  public exec(): RateLimit {
    return rateLimiter(RateLimiterService.getRateLimiterParams(this.callback));
  }
}
