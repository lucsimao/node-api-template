import swaggerMiddleware from './RateLimiterMiddleware';

jest.mock('../__dependencies__/webFramework/ExpressRateLimiter');

describe('RateLimiterMiddleware Tests', () => {
  describe('getMiddleware', () => {
    it('should return middleware as getMiddleware is called', () => {
      const middleware = swaggerMiddleware.getMiddleware();

      expect(middleware).toEqual({ exec: expect.any(Function) });
    });
  });
});
