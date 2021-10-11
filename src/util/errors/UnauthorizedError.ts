import { ApplicationError } from './ApplicationError';
import httpStatus from 'http-status-codes';

export class UnauthorizedError extends ApplicationError {
  constructor(
    public message: string,
    public statusCode: number = httpStatus.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}
