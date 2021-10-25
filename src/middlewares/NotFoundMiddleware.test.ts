import { Request, Response } from 'express';

import { ExpressGenericMiddleware } from '../__dependencies__/webFramework/ExpressGenericMiddleware';
import notFoundMiddleware from './NotFoundMiddleware';

const fakeRequest = {
  ip: 'Fake Ip',
} as Partial<Request>;

const fakeResponse = {
  status: () =>
    ({
      json: jest.fn(),
    } as Partial<Response>),
} as Partial<Response>;

describe('NotFoundMiddleware Tests', () => {
  describe('executeMiddleware', () => {
    it('should call authenticateUser when executeMiddleware is called', async () => {
      const result = await notFoundMiddleware.getMiddleware();

      const expressMiddleware = (result as ExpressGenericMiddleware).exec();

      expressMiddleware(
        fakeRequest as Request,
        fakeResponse as Response,
        jest.fn()
      );

      expect(result).toBeInstanceOf(ExpressGenericMiddleware);
    });
  });
});
