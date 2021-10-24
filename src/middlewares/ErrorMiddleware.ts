import {
  IMiddleware,
  IMiddlewareFactory,
} from '../util/webFramework/framework/WebFramework';

import { ApplicationError } from '../util/errors/ApplicationError';
import { ErrorService } from '../services/ErrorService';
import { ExpressErrorMiddleware } from '../__dependencies__/webFramework/ExpressErrorMiddleware';

class NotFoundMiddleware implements IMiddlewareFactory {
  private middleware;

  constructor() {
    this.middleware = new ExpressErrorMiddleware((error: ApplicationError) => {
      return ErrorService.parseApplicationError(error);
    });
  }

  getMiddleware(): IMiddleware<unknown> {
    return this.middleware;
  }
}

export default new NotFoundMiddleware();
