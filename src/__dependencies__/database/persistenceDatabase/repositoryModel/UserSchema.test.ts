import { Model, model } from 'mongoose';

import { IUser } from '../../../../models/user/IUser';
import { UserSchema } from './UserSchema';

const defaultUser = {
  nome: 'John SignIn',
  email: 'john_users@gmail.com',
  senha: 'signIn@123',
  telefones: [
    {
      ddd: '11',
      numero: '875452123',
    },
  ],
};

describe('UserSchema Tests', () => {
  it('should call toJSON when is called', () => {
    const UserModel = model('User', new UserSchema()) as Model<IUser>;
    const user = new UserModel(defaultUser);
    expect(user.toJSON()).toEqual({
      data_atualizacao: expect.any(String),
      data_criacao: expect.any(String),
      email: 'john_users@gmail.com',
      id: expect.anything(),
      nome: 'John SignIn',
      senha: 'signIn@123',
      telefones: [
        {
          ddd: '11',
          numero: '875452123',
        },
      ],
      token: null,
      ultimo_login: expect.any(String),
    });
  });
});
