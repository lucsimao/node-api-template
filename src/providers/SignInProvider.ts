import AuthService from '../services/AuthService';
import EncryptService from '../services/EncryptService';
import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import { IUser } from '../models/user/IUser';
import Logger from '../util/logger';
import { UnauthorizedError } from '../util/errors/UnauthorizedError';
import UserRepository from '../repositories/users';
import httpStatus from 'http-status-codes';
export class SignInProvider {
  public static async authenticateUser(
    httpRequest: IHttpRequest
  ): Promise<IHttpResponse> {
    Logger.info({ msg: 'Authenticating user' });
    const user = await this.authenticate(httpRequest.body as IUser);
    return {
      statusCode: httpStatus.OK,
      body: user,
    };
  }

  private static async authenticate(user: IUser) {
    const email = user.email;

    const dataBaseUser = await this.findUserInDatabase(email);

    await this.validatePassword(user, dataBaseUser);

    const result = await this.updateUserRepository(dataBaseUser);

    return result;
  }

  private static async findUserInDatabase(email: string) {
    const result = await UserRepository.findOne({ email });
    if (!result) {
      Logger.error({ msg: `${email} not found in database` });
      throw new UnauthorizedError('Usuário e/ou senha inválidos');
    }
    return result;
  }

  private static async validatePassword(user: IUser, dataBaseUser: IUser) {
    const passwordsMatch = await EncryptService.compareHash(
      user.senha,
      dataBaseUser.senha
    );

    if (!passwordsMatch) {
      Logger.error({
        msg: `Authentication error of user with email: ${dataBaseUser.email}`,
      });
      throw new UnauthorizedError('Usuário e/ou senha inválidos');
    }
  }

  private static async updateUserRepository(result: IUser) {
    const token = AuthService.generateUserToken(result);

    const dateNow = new Date().toLocaleString();

    await UserRepository.update(
      { email: result.email },
      {
        token,
        data_atualizacao: dateNow,
        ultimo_login: dateNow,
      }
    );
    return {
      ...result,
      token,
      data_atualizacao: dateNow,
      ultimo_login: dateNow,
    };
  }
}
