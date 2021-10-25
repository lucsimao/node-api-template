import AuthService from '../services/AuthService';
/* eslint-disable @typescript-eslint/no-explicit-any */
import Logger from '../util/logger';
import { UnauthorizedError } from '../util/errors/UnauthorizedError';
import { UserProvider } from './UserProvider';
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
  ultimo_login: '2021-10-10T21:14:48.462Z',
};

const fakeHttpRequest = {
  params: {
    id: 'FakeId',
  },
  headers: { authorization: 'Bearer fakeToken' },
  body: 'Fake Body',
};

const invalidHttpRequest = {
  body: 'Fake Body Invalid',
};

jest.mock('../repositories/users');
jest.mock('../util/logger');
jest.mock('../services/AuthService');

describe('SignUpProvider Tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getUser', () => {
    it('should return IHttpResponse when called successfully', async () => {
      const findOneByIdAndToken = jest
        .spyOn(UserRepository, 'findOneByIdAndToken')
        .mockResolvedValueOnce(defaultUser);

      const result = await UserProvider.getUser(fakeHttpRequest);

      expect(findOneByIdAndToken).toBeCalledWith('FakeId', 'fakeToken');
      expect(result).toEqual({ statusCode: 200, body: defaultUser });
    });

    it('should throw error when findOneByIdAndToken return no user', async () => {
      const findOneByIdAndToken = jest
        .spyOn(UserRepository, 'findOneByIdAndToken')
        .mockResolvedValueOnce(undefined);
      const error = jest.spyOn(Logger, 'error');

      await expect(
        async () => await UserProvider.getUser(fakeHttpRequest)
      ).rejects.toThrow(new UnauthorizedError('Não Autorizado'));

      expect(error).toBeCalledWith({
        msg: 'Usuário não encontrado com o id e token informados',
        token: 'fakeToken',
        userId: 'FakeId',
      });
      expect(findOneByIdAndToken).toBeCalledWith('FakeId', 'fakeToken');
    });

    it('should throw error when pass no id or token', async () => {
      jest
        .spyOn(UserRepository, 'findOneByIdAndToken')
        .mockResolvedValueOnce(undefined);
      const error = jest.spyOn(Logger, 'error');

      await expect(
        async () => await UserProvider.getUser(invalidHttpRequest)
      ).rejects.toThrow(new UnauthorizedError('Sessão inválida'));

      expect(error).toBeCalledWith({
        msg: 'id do usuário ou token não fornecidos',
      });
    });

    it('should throw error when checkIfTheDateHasBeenPassedInMinutes return true', async () => {
      const findOneByIdAndToken = await jest
        .spyOn(UserRepository, 'findOneByIdAndToken')
        .mockResolvedValueOnce(defaultUser);

      jest
        .spyOn(UserProvider as any, 'checkIfTheDateHasBeenPassedInMinutes')
        .mockReturnValueOnce(true);

      const error = jest.spyOn(Logger, 'error');

      await expect(
        async () => await UserProvider.getUser(fakeHttpRequest)
      ).rejects.toThrow(new UnauthorizedError('Sessão inválida'));

      expect(error).toBeCalledWith({
        msg: 'Sessão inválida pois o token já está expirado',
      });
      expect(findOneByIdAndToken).toBeCalledWith('FakeId', 'fakeToken');
    });

    it('should not throw checkIfTheDateHasBeenPassedInMinutes is smaller than limit', async () => {
      const toLocaleTimeString = jest
        .spyOn(Date.prototype, 'toLocaleTimeString')
        .mockReturnValueOnce('2021-10-10T21:43:48.462Z');

      const findOneByIdAndToken = jest
        .spyOn(UserRepository, 'findOneByIdAndToken')
        .mockResolvedValueOnce(defaultUser);

      const user = await UserProvider.getUser(fakeHttpRequest);

      expect(toLocaleTimeString).toBeCalledWith();
      expect(findOneByIdAndToken).toBeCalledWith('FakeId', 'fakeToken');
      expect(user).toEqual({ statusCode: 200, body: defaultUser });
    });

    it('should throw error when checkIfTheDateHasBeenPassedInMinutes is equal limit', async () => {
      const toLocaleTimeString = jest
        .spyOn(Date.prototype, 'toLocaleTimeString')
        .mockReturnValueOnce('2021-10-10T21:44:48.462Z');

      const findOneByIdAndToken = jest
        .spyOn(UserRepository, 'findOneByIdAndToken')
        .mockResolvedValueOnce(defaultUser);

      await expect(
        async () => await UserProvider.getUser(fakeHttpRequest)
      ).rejects.toThrow(new UnauthorizedError('Sessão inválida'));

      expect(toLocaleTimeString).toBeCalledWith();
      expect(findOneByIdAndToken).toBeCalledWith('FakeId', 'fakeToken');
    });

    it('should throw error when checkIfTheDateHasBeenPassedInMinutes is greater than limit', async () => {
      const toLocaleTimeString = jest
        .spyOn(Date.prototype, 'toLocaleTimeString')
        .mockReturnValueOnce('2021-10-10T21:46:48.462Z');

      const findOneByIdAndToken = jest
        .spyOn(UserRepository, 'findOneByIdAndToken')
        .mockResolvedValueOnce(defaultUser);

      await expect(
        async () => await UserProvider.getUser(fakeHttpRequest)
      ).rejects.toThrow(new UnauthorizedError('Sessão inválida'));

      expect(toLocaleTimeString).toBeCalledWith();
      expect(findOneByIdAndToken).toBeCalledWith('FakeId', 'fakeToken');
    });

    it('should throw error when decodeToken throws error', async () => {
      jest.spyOn(AuthService, 'decodeToken').mockImplementation(() => {
        throw new UnauthorizedError('Fake Error');
      });

      await expect(
        async () => await UserProvider.getUser(fakeHttpRequest)
      ).rejects.toThrow(new UnauthorizedError('Não Autorizado'));
    });
  });
});
