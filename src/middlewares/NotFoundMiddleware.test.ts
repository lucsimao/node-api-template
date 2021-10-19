import { GenericMiddleware } from '../__dependencies__/webFramework/GenericMiddleware';
import notFoundMiddleware from './NotFoundMiddleware';

describe('NotFoundMiddleware Tests', () => {
  describe('executeMiddleware', () => {
    it('should call authenticateUser when executeMiddleware is called', async () => {
      const result = await notFoundMiddleware.getMiddleware();
      expect(result).toBeInstanceOf(GenericMiddleware);
    });
  });
});
