import { ExpressRateLimiter } from '../__dependencies__/webFramework/ExpressRateLimiter';
import { Options } from 'express-rate-limit';
import { RateLimiterService } from '../__dependencies__/webFramework/util/RateLimiterService';
import rateLimiterMiddleware from './RateLimiterMiddleware';

jest.mock('express-rate-limit');

describe('RateLimiterMiddleware Tests', () => {
  describe('getMiddleware', () => {
    it('should return middleware as getMiddleware is called', () => {
      jest
        .spyOn(RateLimiterService, 'getRateLimiterParams')
        .mockImplementationOnce((callback: CallableFunction) => {
          if (callback) callback();
          return {} as Options;
        });
      const result = rateLimiterMiddleware.getMiddleware();

      (result as ExpressRateLimiter).exec();

      expect(result).toBeInstanceOf(ExpressRateLimiter);
    });
  });
});
