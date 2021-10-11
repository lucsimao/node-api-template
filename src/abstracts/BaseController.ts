import { ApplicationError } from '../util/errors/ApplicationError';
import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import Logger from '../util/logger';
import httpStatus from 'http-status-codes';

export abstract class BaseController {
  protected abstract executeRoute(
    httpRequest: IHttpRequest
  ): Promise<IHttpResponse>;

  public async execute(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      return await this.executeRoute(httpRequest);
    } catch (error) {
      return this.parseApplicationError(error as ApplicationError);
    }
  }

  private parseApplicationError(error: ApplicationError) {
    Logger.error({ msg: `Error on ${error.message}` });
    return {
      statusCode: error.statusCode || httpStatus.BAD_REQUEST,
      body: { message: error.message },
    };
  }
}
