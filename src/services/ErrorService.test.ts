import { ApplicationError } from '../util/errors/ApplicationError';
import { ErrorService } from './ErrorService';
import { NotFoundError } from '../util/errors/NotFoundError';

describe('ErrorService Tests', () => {
  describe('parseApplicationError', () => {
    it('should return httpResponse when called', () => {
      const result = ErrorService.parseApplicationError(new NotFoundError());
      expect(result).toEqual({
        body: { message: 'Not Found' },
        statusCode: 404,
      });
    });
    it('should return 400 Bad Request when called without statusCode', () => {
      const result = ErrorService.parseApplicationError(
        new Error('Fake error') as ApplicationError
      );
      expect(result).toEqual({
        body: { message: 'Fake error' },
        statusCode: 400,
      });
    });
  });
});
