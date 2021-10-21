import rateLimiter, { RateLimit } from 'express-rate-limit';

import { IMiddleware } from '../../util/webFramework/framework/WebFramework';
import { RateLimiterService } from './util/RateLimiterService';

export class ExpressRateLimiter implements IMiddleware<RateLimit> {
  private callback: CallableFunction;
  constructor(callback: CallableFunction) {
    this.callback = callback;
  }

  public exec(): RateLimit {
    return rateLimiter(RateLimiterService.getRateLimiterParams(this.callback));
  }
}
