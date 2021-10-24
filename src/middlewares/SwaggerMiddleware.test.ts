import swaggerMiddleware from './SwaggerMiddleware';

jest.mock('../__dependencies__/webFramework/ExpressSwagger');

describe('SwaggerMiddleware Tests', () => {
  describe('getMiddleware', () => {
    it('should return middleware as getMiddleware is called', () => {
      const middleware = swaggerMiddleware.getMiddleware();

      expect(middleware).toEqual({ exec: expect.any(Function) });
    });
  });
});
