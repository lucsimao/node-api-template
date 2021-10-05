/* eslint-disable @typescript-eslint/no-unused-vars */
import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import { IMiddleware } from '../util/webFramework/framework/WebFramework';
import httpStatus from 'http-status-codes';

class NotFoundMiddleware implements IMiddleware {
  async executeMiddleware(_: IHttpRequest): Promise<IHttpResponse> {
    return {
      statusCode: httpStatus.NOT_FOUND,
      body: `Not found`,
    };
  }
}

export default new NotFoundMiddleware();
