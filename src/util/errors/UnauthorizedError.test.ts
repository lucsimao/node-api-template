import { UnauthorizedError } from './UnauthorizedError';

describe('UnauthorizedError Tests', () => {
  it('should return 401 when created', () => {
    const error = new UnauthorizedError('Fake Message');
    expect(error.message).toBe('Fake Message');
    expect(error.statusCode).toBe(401);
  });
});
