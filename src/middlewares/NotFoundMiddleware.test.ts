import notFoundMiddleware from './NotFoundMiddleware';

const fakeHttpRequest = {
  body: 'Fake HttpRequest Body',
};

describe('NotFoundMiddleware Tests', () => {
  describe('executeMiddleware', () => {
    it('should call authenticateUser when executeMiddleware is called', async () => {
      const result = await notFoundMiddleware.executeMiddleware(
        fakeHttpRequest
      );
      expect(result).toEqual({ body: 'Not found', statusCode: 404 });
    });
  });
});
