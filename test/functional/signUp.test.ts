import UserRepository from '../../src/repositories/users';

describe('SignUp Tests', () => {
  const defaultUser = {
    nome: 'John SignUp',
    email: 'john_sign_up@gmail.com',
    senha: 'signup@123',
    telefones: [
      {
        ddd: '11',
        numero: '875452123',
      },
    ],
  };

  beforeEach(async () => {
    await UserRepository.deleteAll();
  });

  describe('POST Method', () => {
    it('should return 201 and the user when call the route', async () => {
      const response = await global.testRequest
        .post('/signup')
        .send(defaultUser);

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
      expect(response.status).toBe(201);
    });

    it('should return 400 and the user when call the route', async () => {
      const user = {
        nome: 'John SignUp',
        email: 'john_sign_up',
        senha: 'signup@123',
        telefones: [
          {
            numero: '875452123',
            ddd: '11',
          },
        ],
      };
      const response = await global.testRequest.post('/signup').send(user);

      expect(response.body).toEqual({
        message: 'error validating schema: "email" must be a valid email',
      });
      expect(response.status).toBe(400);
    });

    it('should return 400 and the user when call the route', async () => {
      const user = {
        nome: 'John SignUp',
        email: 'john_sign_up@gmail.com',
        senha: 'signup@123',
        telefones: [
          {
            numero: '875452123',
            ddd: '11',
          },
        ],
      };

      await global.testRequest.post('/signUp').send(user);
      const response = await global.testRequest.post('/signup').send(user);

      expect(response.body).toEqual({
        message: 'Email já existente',
      });
      expect(response.status).toBe(400);
    });
  });
});
