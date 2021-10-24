import { ApplicationError } from './ApplicationError';
import httpStatus from 'http-status-codes';

export class NotFoundError extends ApplicationError {
  constructor() {
    super(`Not Found`, httpStatus.NOT_FOUND);
  }
}
