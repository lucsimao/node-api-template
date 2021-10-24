import { NotFoundError } from './NotFoundError';

describe('NotFoundError Tests', () => {
  it('should return 404 Not Found when created', () => {
    const error = new NotFoundError();
    expect(error.message).toBe('Not Found');
    expect(error.statusCode).toBe(404);
  });
});
