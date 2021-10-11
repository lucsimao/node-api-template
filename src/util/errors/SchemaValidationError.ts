import { ApplicationError } from './ApplicationError';
import httpStatus from 'http-status-codes';
export default class SchemaValidationError extends ApplicationError {
  constructor(
    public message: string,
    public statusCode: number = httpStatus.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}
