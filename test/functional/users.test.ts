import UserRepository from '../../src/repositories/users';

describe('SignUp Tests', () => {
  const defaultUser = {
    nome: 'John Users',
    email: 'john_users@gmail.com',
    senha: 'users@123',
    telefones: [
      {
        numero: '875452123',
        ddd: '11',
      },
    ],
  };

  const defaultUser2 = {
    nome: 'John Users2',
    email: 'john_users2@gmail.com',
    senha: 'users@1232',
    telefones: [
      {
        numero: '875452123',
        ddd: '11',
      },
    ],
  };

  let token: string | undefined;
  let id: string | undefined;

  beforeEach(async () => {
    await UserRepository.deleteAll();
    await global.testRequest.post('/signup').send(defaultUser);
    const user = await UserRepository.findOne({ email: defaultUser.email });
    id = user?.id;
    token = user?.token || '';
  });

  describe('GET Method', () => {
    it('should return 200 and the user status when call route', async () => {
      const response = await global.testRequest
        .get(`/users/${id}`)
        .set({ authorization: `Bearer ${token}` });

      expect(response.body).toEqual({
        data_atualizacao: expect.stringContaining(''),
        data_criacao: expect.stringContaining(''),
        email: defaultUser.email,
        id: expect.stringContaining(''),
        nome: defaultUser.nome,
        senha: expect.stringContaining(''),
        telefones: [{ ddd: '11', numero: '875452123' }],
        token: expect.stringContaining(''),
        ultimo_login: expect.stringContaining(''),
      });

      expect(response.status).toBe(200);
    });

    it('should return 400 when receive invalid token', async () => {
      const response = await global.testRequest
        .get(`/users/${id}`)
        .set({ authorization: `Bearer ` });

      expect(response.body).toEqual({ message: 'Não Autorizado' });
      expect(response.status).toBe(401);
    });

    it('should return 400 when receive a token of another user', async () => {
      await global.testRequest.post('/signup').send(defaultUser2);
      const user = await UserRepository.findOne({
        email: defaultUser2.email,
      });
      id = user?.id;

      const response = await global.testRequest
        .get(`/users/${id}`)
        .set({ authorization: `Bearer ${token}` });

      expect(response.body).toEqual({ message: 'Não Autorizado' });
      expect(response.status).toBe(401);
    });
  });
});
