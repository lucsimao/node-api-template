import {
  IMiddleware,
  IMiddlewareFactory,
} from '../util/webFramework/framework/WebFramework';

import { GenericMiddleware } from '../__dependencies__/webFramework/GenericMiddleware';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import httpStatus from 'http-status-codes';

class NotFoundMiddleware implements IMiddlewareFactory {
  private middleware;

  constructor() {
    this.middleware = new GenericMiddleware(() => ({
      statusCode: httpStatus.NOT_FOUND,
      body: { message: 'Not found' },
    }));
  }

  getMiddleware(): IMiddleware<unknown> {
    return this.middleware;
  }
}

export default new NotFoundMiddleware();
