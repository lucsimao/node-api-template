import { ApplicationError } from './ApplicationError';
import httpStatus from 'http-status-codes';

export class DuplicationError extends ApplicationError {
  constructor(
    public key: string,
    public statusCode: number = httpStatus.BAD_REQUEST
  ) {
    super(`${key} já existente`, statusCode);
  }
}
