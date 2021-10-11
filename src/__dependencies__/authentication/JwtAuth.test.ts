import auth from './index';
import jwt from 'jsonwebtoken';
jest.mock('jsonwebtoken');

describe('JwtAuth Tests', () => {
  describe('generateToken', () => {
    it('should call sign when generateToken is called', () => {
      const sign = jest.spyOn(jwt, 'sign').mockReturnValue();
      auth.generateToken({ fake: 'payload' });
      expect(sign).toBeCalledWith({ fake: 'payload' }, 'secret', {
        expiresIn: '30m',
      });
    });
  });
  describe('verifyToken', () => {
    it('should call verify when verifyToken is called', () => {
      const verify = jest.spyOn(jwt, 'verify').mockReturnValue();

      auth.verifyToken('fake token');
      expect(verify).toBeCalledWith('fake token', 'secret');
    });
  });
});
