import { IUser } from '../models/user/IUser';
import jwt from 'jsonwebtoken';

export interface IDecodedUser extends Omit<IUser, '_id'> {
  id: string;
}

const AUTH_SECRET = 'secret';
const AUTH_EXPIRES_IN = '30m';

export default class AuthService {
  public static generateToken(payload: {
    [key: string]: string | boolean | number;
  }): string {
    const token = jwt.sign(payload, AUTH_SECRET, {
      expiresIn: AUTH_EXPIRES_IN,
    });

    return token;
  }

  public static decodeToken(token: string): IDecodedUser {
    return jwt.verify(token, AUTH_SECRET) as IDecodedUser;
  }

  public static generateUserToken(userData: IUser & { id?: string }): string {
    return this.generateToken({
      nome: userData.nome,
      email: userData.email,
      ultimo_login: new Date().toLocaleTimeString(),
    });
  }
}
