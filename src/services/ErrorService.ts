import { ApplicationError } from '../util/errors/ApplicationError';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import httpStatus from 'http-status-codes';

export class ErrorService {
  public static parseApplicationError(error: ApplicationError): IHttpResponse {
    return {
      statusCode: error.statusCode || httpStatus.BAD_REQUEST,
      body: { message: error.message },
    };
  }
}
