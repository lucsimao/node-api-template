import { Request, Response } from 'express';

import { ExpressErrorMiddleware } from './ExpressErrorMiddleware';
import { NotFoundError } from '../../util/errors/NotFoundError';

const json = jest.fn();

const fakeRequest = {
  ip: 'Fake Ip',
} as Partial<Request>;

const fakeResponse = {
  status: () =>
    ({
      json,
    } as Partial<Response>),
} as Partial<Response>;

const fakeCallback = () => ({
  statusCode: 1,
  body: 'Fake Body',
});

describe('ExpressErrorMiddleware Tests', () => {
  describe('exec', () => {
    it('should call rateLimiter when exec is called', async () => {
      const status = jest.spyOn(fakeResponse, 'status');
      const expressRateLimiter = new ExpressErrorMiddleware(fakeCallback);
      const middleware = expressRateLimiter.exec();

      await middleware(
        new NotFoundError(),
        fakeRequest as Request,
        fakeResponse as Response,
        () => ''
      );

      expect(status).toBeCalledWith(fakeCallback().statusCode);
      expect(json).toBeCalledWith(fakeCallback().body);
    });
  });
});
