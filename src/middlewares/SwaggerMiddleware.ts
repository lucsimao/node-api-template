import {
  IMiddleware,
  IMiddlewareFactory,
} from '../util/webFramework/framework/WebFramework';

import { ExpressSwagger } from '../__dependencies__/webFramework/ExpressSwagger';

class SwaggerMiddleware implements IMiddlewareFactory {
  private middleware;

  constructor() {
    this.middleware = new ExpressSwagger();
  }

  getMiddleware(): IMiddleware<unknown> {
    return this.middleware;
  }
}

export default new SwaggerMiddleware();
