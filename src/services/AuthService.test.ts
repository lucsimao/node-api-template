import AuthService from './AuthService';
import { IUser } from '../models/user/IUser';
import authentication from './authentication';

describe('AuthService Tests', () => {
  describe('generateUserToken', () => {
    it('should return valid token when called', () => {
      const generateToken = jest.spyOn(authentication, 'generateToken');

      const result = AuthService.generateUserToken({
        nome: 'nome',
        email: 'email',
      } as IUser);

      expect(generateToken).toBeCalledWith({
        email: 'email',
        nome: 'nome',
        ultimo_login: expect.any(String),
      });
      expect(result).toEqual(
        expect.stringContaining('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
      );
    });
  });

  describe('decodeToken', () => {
    it('should return valid token when called', () => {
      const verifyToken = jest.spyOn(authentication, 'verifyToken');

      expect(() =>
        AuthService.decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
      ).toThrow(new Error('jwt malformed'));

      expect(verifyToken).toBeCalledWith(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
      );
    });
  });
});
