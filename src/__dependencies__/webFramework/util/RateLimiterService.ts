import { Request, Response } from 'express';

import Env from '../../../config/Env';
import { Options } from 'express-rate-limit';

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
