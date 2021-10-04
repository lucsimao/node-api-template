import { ApplicationError } from './ApplicationError';

export class DatabaseError extends ApplicationError {
  constructor(public message: string, public statusCode: number) {
    super(message, statusCode);
  }
}
