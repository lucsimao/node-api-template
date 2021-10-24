import {
  IMiddleware,
  IMiddlewareFactory,
} from '../util/webFramework/framework/WebFramework';

import { ApplicationError } from '../util/errors/ApplicationError';
import { ExpressErrorMiddleware } from '../__dependencies__/webFramework/ExpressErrorMiddleware';
import Logger from '../util/logger';
import httpStatus from 'http-status-codes';

class NotFoundMiddleware implements IMiddlewareFactory {
  private middleware;

  constructor() {
    this.middleware = new ExpressErrorMiddleware((error: ApplicationError) => {
      return this.parseApplicationError(error);
    });
  }

  getMiddleware(): IMiddleware<unknown> {
    return this.middleware;
  }

  private parseApplicationError(error: ApplicationError) {
    Logger.error({ msg: `Error on ${error.message}` });
    return {
      statusCode: error.statusCode || httpStatus.BAD_REQUEST,
      body: { message: error.message },
    };
  }
}

export default new NotFoundMiddleware();
