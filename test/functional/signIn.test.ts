import userRepository from '../../src/repositories/users';

describe('SignIn Tests', () => {
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

  beforeEach(async () => {
    await userRepository.deleteAll();
    await global.testRequest.post('/signup').send(defaultUser);
  });

  describe('POST Method', () => {
    it('should return 201 and the user when call the route', async () => {
      const response = await global.testRequest.post('/signin').send({
        email: defaultUser.email,
        senha: defaultUser.senha,
      });

      expect(response.body).toEqual({
        data_atualizacao: expect.stringContaining(''),
        data_criacao: expect.stringContaining(''),
        email: defaultUser.email,
        id: expect.stringContaining(''),
        nome: defaultUser.nome,
        senha: expect.stringContaining(''),
        telefones: [
          {
            ddd: '11',
            numero: '875452123',
          },
        ],
        token: expect.stringContaining(''),
        ultimo_login: expect.stringContaining(''),
      });

      expect(response.status).toBe(200);
    });

    it('should return 401 and invalid user when call the route with invalid email', async () => {
      const response = await global.testRequest.post('/signin').send({
        email: defaultUser.email,
        senha: 'invalid  senha',
      });

      expect(response.body).toEqual({
        message: 'Usuário e/ou senha inválidos',
      });

      expect(response.status).toBe(401);
    });

    it('should return 401 and invalid user when call the route with invalid email', async () => {
      const response = await global.testRequest.post('/signin').send({
        email: 'invalid@email.com',
        senha: defaultUser.senha,
      });

      expect(response.body).toEqual({
        message: 'Usuário e/ou senha inválidos',
      });

      expect(response.status).toBe(401);
    });
  });
});
