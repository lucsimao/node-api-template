/* eslint-disable @typescript-eslint/no-explicit-any */
import EncryptService from '../services/EncryptService';
import { SignInProvider } from './SignInProvider';
import { UnauthorizedError } from '../util/errors/UnauthorizedError';
import UserRepository from '../repositories/users';

const defaultUser = {
  nome: 'John SignIn',
  email: 'john_users@gmail.com',
  senha: 'signIn@123',
  telefones: {
    phoneList: [
      {
        numero: '875452123',
        ddd: '11',
      },
    ],
  },
};

const fakeHttpRequest = {
  body: defaultUser,
};

jest.mock('../repositories/users');
jest.mock('../util/logger');
jest.mock('../services/EncryptService');
jest.mock('../services/AuthService');

describe('SignInProvider Tests', () => {
  describe('authenticateUser', () => {
    it('should return IHttpResponse when called successfully', async () => {
      const findOne = jest
        .spyOn(UserRepository, 'findOne')
        .mockReturnValue(Promise.resolve(defaultUser));

      const compareHash = jest
        .spyOn(EncryptService, 'compareHash')
        .mockReturnValue(Promise.resolve(true));

      const result = await SignInProvider.authenticateUser(fakeHttpRequest);

      expect(findOne).toBeCalledWith({ email: 'john_users@gmail.com' });
      expect(compareHash).toBeCalledWith('signIn@123', 'signIn@123');
      expect(result.body).toEqual(expect.objectContaining(defaultUser));
    });

    it('should throw error when findOne does not return result', async () => {
      const findOne = jest
        .spyOn(UserRepository, 'findOne')
        .mockReturnValue(Promise.resolve(undefined));

      await expect(async () => {
        await SignInProvider.authenticateUser(fakeHttpRequest);
      }).rejects.toThrow(new UnauthorizedError('Usuário e/ou senha inválidos'));

      expect(findOne).toBeCalledWith({ email: 'john_users@gmail.com' });
    });

    it('should throw error when password does not match', async () => {
      const findOne = jest
        .spyOn(UserRepository, 'findOne')
        .mockReturnValue(Promise.resolve(defaultUser));

      const compareHash = jest
        .spyOn(EncryptService, 'compareHash')
        .mockReturnValue(Promise.resolve(false));

      await expect(async () => {
        await SignInProvider.authenticateUser(fakeHttpRequest);
      }).rejects.toThrow(new UnauthorizedError('Usuário e/ou senha inválidos'));

      expect(findOne).toBeCalledWith({ email: 'john_users@gmail.com' });
      expect(compareHash).toBeCalledWith('signIn@123', 'signIn@123');
    });
  });
});
