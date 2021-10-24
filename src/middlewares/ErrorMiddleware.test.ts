import { ExpressErrorMiddleware } from '../__dependencies__/webFramework/ExpressErrorMiddleware';
import errorMiddleware from './ErrorMiddleware';
describe('ErrorMiddleware Tests', () => {
  describe('executeMiddleware', () => {
    it('should call authenticateUser when executeMiddleware is called', async () => {
      const result = await errorMiddleware.getMiddleware();

      expect(result).toBeInstanceOf(ExpressErrorMiddleware);
    });
  });
});
