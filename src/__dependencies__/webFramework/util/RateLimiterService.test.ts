import { NextFunction, Request, Response } from 'express';

import { Options } from 'express-rate-limit';
import { RateLimiterService } from './RateLimiterService';

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

describe('RateLimiterService Tests', () => {
  describe('getRateLimiterParams', () => {
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
