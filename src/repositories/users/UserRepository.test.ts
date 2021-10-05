import { DatabaseError } from '../../util/errors/DatabaseError';
import { IUser } from '../../models/user/IUser';
import httpStatus from 'http-status-codes';
import repositoryModel from '../../__dependencies__/database/persistenceDatabase/repositoryModel';
import userRepository from './index';

jest.mock(
  '../../__dependencies__/database/persistenceDataBase/repositoryModel'
);

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

describe('UserRepository Tests', () => {
  describe('create', () => {
    it('should return created user when called', async () => {
      const save = jest
        .spyOn(repositoryModel, 'save')
        .mockReturnValue(Promise.resolve(defaultUser as IUser));

      const result = await userRepository.create(defaultUser);

      expect(save).toBeCalledWith(defaultUser);
      expect(result).toEqual(defaultUser);
    });

    it('should throw error when save return no result', async () => {
      const save = jest
        .spyOn(repositoryModel, 'save')
        .mockReturnValue(Promise.resolve(undefined as unknown as IUser));

      await expect(
        async () => await userRepository.create(defaultUser)
      ).rejects.toThrow(
        new DatabaseError(
          'Could not save user john_users@gmail.com in database',
          httpStatus.BAD_REQUEST
        )
      );

      expect(save).toBeCalledWith(defaultUser);
    });
  });

  describe('update', () => {
    it('should return updated user when called', async () => {
      const updateOne = jest
        .spyOn(repositoryModel, 'updateOne')
        .mockReturnValue(Promise.resolve(defaultUser as IUser));

      const result = await userRepository.update(
        { email: 'lucas' },
        defaultUser
      );

      expect(updateOne).toBeCalledWith({ email: 'lucas' }, defaultUser);
      expect(result).toEqual(defaultUser);
    });

    it('should throw error when update one return no user', async () => {
      const updateOne = jest
        .spyOn(repositoryModel, 'updateOne')
        .mockReturnValue(Promise.resolve(undefined));

      await expect(
        async () => await userRepository.update({ email: 'lucas' }, defaultUser)
      ).rejects.toThrow(
        new DatabaseError(
          'User john_users@gmail.com not found in database',
          httpStatus.BAD_REQUEST
        )
      );

      expect(updateOne).toBeCalledWith({ email: 'lucas' }, defaultUser);
    });
  });

  describe('findOne', () => {
    it('should return found user when called', async () => {
      const findOne = jest
        .spyOn(repositoryModel, 'findOne')
        .mockReturnValue(Promise.resolve(defaultUser as IUser));

      const result = await userRepository.findOne({ email: 'lucas' });

      expect(findOne).toBeCalledWith({ email: 'lucas' });
      expect(result).toEqual(defaultUser);
    });
  });

  describe('deleteAll', () => {
    it('should call UserRepositoryModel.deleteAll when called', async () => {
      const deleteAll = jest.spyOn(repositoryModel, 'deleteAll');

      await userRepository.deleteAll();

      expect(deleteAll).toBeCalledWith();
    });
  });

  describe('findOneByIdAndToken', () => {
    it('should call UserRepositoryModel.findOneByIdAndToken when called', async () => {
      const findOneByIdAndToken = jest
        .spyOn(repositoryModel, 'findOneByIdAndToken')
        .mockReturnValue(Promise.resolve(defaultUser as IUser));

      const result = await userRepository.findOneByIdAndToken(
        'Fake Id',
        'Fake Token'
      );

      expect(findOneByIdAndToken).toBeCalledWith('Fake Id', 'Fake Token');
      expect(result).toEqual(defaultUser);
    });
  });
});
