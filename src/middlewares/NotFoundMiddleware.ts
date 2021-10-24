import {
  IMiddleware,
  IMiddlewareFactory,
} from '../util/webFramework/framework/WebFramework';

import { ExpressGenericMiddleware } from '../__dependencies__/webFramework/ExpressGenericMiddleware';
import { NotFoundError } from '../util/errors/NotFoundError';

class NotFoundMiddleware implements IMiddlewareFactory {
  private middleware;

  constructor() {
    this.middleware = new ExpressGenericMiddleware(() => {
      throw new NotFoundError();
    });
  }

  getMiddleware(): IMiddleware<unknown> {
    return this.middleware;
  }
}

export default new NotFoundMiddleware();
