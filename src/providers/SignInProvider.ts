import AuthService from '../services/AuthService';
import EncryptService from '../services/EncryptService';
import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import { IUser } from '../models/user/IUser';
import Logger from '../util/logger';
import { UnauthorizedError } from '../util/errors/UnauthorizedError';
import UserRepository from '../repositories/users';

export default class UserService {
  public static async authenticateUser(
    httpRequest: IHttpRequest
  ): Promise<IHttpResponse> {
    Logger.info({ msg: 'Authenticating user' });
    const user = await this.authenticate(httpRequest.body as IUser);
    return {
      statusCode: 200 || httpRequest,
      body: user,
    };
  }

  private static async authenticate(user: IUser) {
    const email = user.email;

    const result = await UserRepository.findOne({ email });

    if (!result) {
      Logger.error({ msg: `${user.email} not found in database` });
      throw new UnauthorizedError('Usuário e/ou senha inválidos');
    }

    const passwordsMatch = await EncryptService.compareHash(
      user.senha,
      result.senha
    );

    if (!passwordsMatch) {
      Logger.error({
        msg: `Authentication error of user with email: ${result.email}`,
      });
      throw new UnauthorizedError('Usuário e/ou senha inválidos');
    }

    const token = AuthService.generateUserToken(result);

    const dataAtual = new Date().toLocaleString();

    await UserRepository.update(
      { email: result.email },
      {
        token,
        data_atualizacao: dataAtual,
        ultimo_login: dataAtual,
      }
    );

    return {
      ...result,
      token,
      data_atualizacao: dataAtual,
      ultimo_login: dataAtual,
    };
  }
}
