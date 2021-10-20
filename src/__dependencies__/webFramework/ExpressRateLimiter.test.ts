import { ExpressRateLimiter, RateLimiterService } from './ExpressRateLimiter';
import { NextFunction, Request, Response } from 'express';
import rateLimiter, { Options } from 'express-rate-limit';

jest.mock('express-rate-limit', () =>
  jest.fn().mockImplementation((params: Options) => {
    return params;
  })
);

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

const fakeNext = {} as NextFunction;

describe('ExpressRateLimiter Tests', () => {
  describe('exec', () => {
    it('should call rateLimiter when exec is called', () => {
      const expressRateLimiter = new ExpressRateLimiter(() => '');
      expressRateLimiter.exec();

      expect(rateLimiter).toBeCalledWith({
        handler: expect.any(Function),
        keyGenerator: expect.any(Function),
        max: 10,
        windowMs: 60000,
      });
    });

    it('should call req.ip in keyGenerator is called', () => {
      const params = RateLimiterService.getRateLimiterParams(fakeCallback);
      let keyGenerator;

      if (params.keyGenerator) {
        keyGenerator = params.keyGenerator(
          fakeRequest as Request,
          fakeResponse as Response
        );
      }

      expect(keyGenerator).toBe('Fake Ip');
    });

    it('should call res.status in handler is called', async () => {
      const status = jest.spyOn(fakeResponse, 'status');
      const params = RateLimiterService.getRateLimiterParams(fakeCallback);

      if (params.handler)
        await params.handler(
          fakeRequest as Request,
          fakeResponse as Response,
          fakeNext as NextFunction
        );

      expect(status).toBeCalledWith(fakeCallback().statusCode);
      expect(json).toBeCalledWith(fakeCallback().body);
    });
  });
});
