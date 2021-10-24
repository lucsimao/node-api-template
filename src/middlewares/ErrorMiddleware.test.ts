import { Request, Response } from 'express';

import { ExpressErrorMiddleware } from '../__dependencies__/webFramework/ExpressErrorMiddleware';
import { NotFoundError } from '../util/errors/NotFoundError';
import errorMiddleware from './ErrorMiddleware';

const fakeRequest = {
  ip: 'Fake Ip',
} as Partial<Request>;

const fakeResponse = {
  status: () =>
    ({
      json: jest.fn(),
    } as Partial<Response>),
} as Partial<Response>;

describe('ErrorMiddleware Tests', () => {
  describe('executeMiddleware', () => {
    it('should call authenticateUser when executeMiddleware is called', async () => {
      const result = await errorMiddleware.getMiddleware();
      const expressMiddleware = (result as ExpressErrorMiddleware).exec();

      expressMiddleware(
        new NotFoundError(),
        fakeRequest as Request,
        fakeResponse as Response,
        jest.fn()
      );

      expect(result).toBeInstanceOf(ExpressErrorMiddleware);
    });
  });
});
