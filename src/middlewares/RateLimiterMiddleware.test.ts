import { ExpressRateLimiter } from '../__dependencies__/webFramework/ExpressRateLimiter';
import rateLimiterMiddleware from './RateLimiterMiddleware';

jest.mock('../__dependencies__/webFramework/ExpressRateLimiter');

describe('RateLimiterMiddleware Tests', () => {
  describe('getMiddleware', () => {
    it('should return middleware as getMiddleware is called', () => {
      const result = rateLimiterMiddleware.getMiddleware();
      (result as ExpressRateLimiter).exec();
      expect(result).toEqual({ exec: expect.any(Function) });
    });
  });
});
