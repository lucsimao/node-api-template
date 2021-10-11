import { IUser } from '../../models/user/IUser';

export interface IDecodedUser extends Omit<IUser, '_id'> {
  id: string;
}

export interface IAuthParams {
  [key: string]: unknown;
}

export interface IAuth {
  generateToken(payload: IAuthParams): string;
  verifyToken(token: string): IDecodedUser;
}
