import AuthService from '../services/AuthService';
import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import { IUser } from '../models/user/IUser';
import Logger from '../util/logger';
import { UnauthorizedError } from '../util/errors/UnauthorizedError';
import UserRepository from '../repositories/users';
import { differenceInMinutes } from 'date-fns';
import httpStatus from 'http-status-codes';
export class UserProvider {
  public static async getUser(
    httpRequest: IHttpRequest
  ): Promise<IHttpResponse> {
    const [id, token] = this.validateTokenAndId(httpRequest);

    const tokenBody = this.extractTokenBody(token);

    const user = await this.findUser(id, tokenBody);

    return {
      statusCode: httpStatus.OK,
      body: user,
    };
  }

  private static validateTokenAndId(
    httpRequest: IHttpRequest
  ): [string, string] {
    const id = httpRequest.params?.id;
    const token = httpRequest.headers?.authorization;
    if (!id || !token) {
      Logger.error({ msg: 'id do usuário ou token não fornecidos' });
      throw new UnauthorizedError('Sessão inválida');
    }
    return [id, token];
  }

  private static extractTokenBody(token: string): string {
    try {
      const [, tokenBody] = token.split(' ');
      AuthService.decodeToken(tokenBody);
      return tokenBody;
    } catch (_) {
      throw new UnauthorizedError('Não Autorizado');
    }
  }

  private static async findUser(userId: string, token: string): Promise<IUser> {
    const user = await UserRepository.findOneByIdAndToken(userId, token);
    if (!user) {
      Logger.error({
        msg: 'Usuário não encontrado com o id e token informados',
        userId,
        token,
      });
      throw new UnauthorizedError('Não Autorizado');
    }

    if (
      this.checkIfTheDateHasBeenPassedInMinutes(user.ultimo_login as string)
    ) {
      Logger.error({ msg: 'Sessão inválida pois o token já está expirado' });
      throw new UnauthorizedError('Sessão inválida');
    }

    return user;
  }

  private static checkIfTheDateHasBeenPassedInMinutes(
    referenceDate: string,
    limit = 30
  ): boolean {
    const actualDate = new Date().toLocaleTimeString();

    const diffInMinutes = differenceInMinutes(
      new Date(actualDate),
      new Date(referenceDate)
    );

    return diffInMinutes >= limit;
  }
}
