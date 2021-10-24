import rateLimiter, { Options } from 'express-rate-limit';

import { ExpressRateLimiter } from './ExpressRateLimiter';

jest.mock('express-rate-limit', () =>
  jest.fn().mockImplementation((params: Options) => {
    return params;
  })
);

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
  });
});
