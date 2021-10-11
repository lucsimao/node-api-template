import { SignUpProvider } from './SignUpProvider';
import UserSchema from '../schemas/UserSchema';
import userRepository from '../repositories/users';
import validator from '../validators';

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

jest.mock('../validators');
jest.mock('../repositories/users');

describe('SignUpProvider Tests', () => {
  describe('authenticateUser', () => {
    it('should return IHttpResponse when called successfully', async () => {
      const validateSchema = jest
        .spyOn(validator, 'validateSchema')
        .mockReturnValueOnce(defaultUser);

      const result = await SignUpProvider.generateUser(defaultUser);

      expect(result).toEqual({ body: undefined, statusCode: 201 });
      expect(validateSchema).toBeCalledWith(
        expect.objectContaining(UserSchema),
        defaultUser,
        'error validating schema'
      );
    });

    it('should throw error when findOne does not return user', async () => {
      const validateSchema = jest
        .spyOn(validator, 'validateSchema')
        .mockReturnValueOnce(defaultUser);

      const findOne = jest
        .spyOn(userRepository, 'findOne')
        .mockReturnValueOnce(Promise.resolve(defaultUser));

      await expect(
        async () => await SignUpProvider.generateUser(defaultUser)
      ).rejects.toThrow(new Error('Email já existente'));

      expect(findOne).toBeCalledWith({ email: 'john_users@gmail.com' });
      expect(validateSchema).toBeCalledWith(
        expect.objectContaining(UserSchema),
        defaultUser,
        'error validating schema'
      );
    });
  });
});
