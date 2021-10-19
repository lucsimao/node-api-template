import {
  IMiddleware,
  IMiddlewareFactory,
} from '../util/webFramework/framework/WebFramework';

import { ExpressRateLimiter } from '../__dependencies__/webFramework/ExpressRateLimiter';

class RateLimiterMiddleware implements IMiddlewareFactory {
  private middleware;

  constructor() {
    this.middleware = new ExpressRateLimiter(() => ({
      statusCode: 429,
      body: { message: `Too many requests to endpoint` },
    }));
  }

  getMiddleware(): IMiddleware<unknown> {
    return this.middleware;
  }
}

export default new RateLimiterMiddleware();
