import { IDecodedUser } from './authentication/IAuth';
import { IUser } from '../models/user/IUser';
import authentication from './authentication';

export default class AuthService {
  public static generateUserToken(userData: IUser & { id?: string }): string {
    return authentication.generateToken({
      nome: userData.nome,
      email: userData.email,
      ultimo_login: new Date().toLocaleTimeString(),
    });
  }

  public static decodeToken(token: string): IDecodedUser {
    return authentication.verifyToken(token);
  }
}
