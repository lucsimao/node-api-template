import {
  IAuth,
  IAuthParams,
  IDecodedUser,
} from '../../services/authentication/IAuth';

import Env from '../../config/Env';
import jwt from 'jsonwebtoken';

const AUTH_SECRET = Env.app.auth.secret;
const AUTH_EXPIRES_IN = Env.app.auth.expiration;

export default class JwtAuth implements IAuth {
  generateToken(payload: IAuthParams): string {
    return jwt.sign(payload, AUTH_SECRET, {
      expiresIn: AUTH_EXPIRES_IN,
    });
  }
  verifyToken(token: string): IDecodedUser {
    return jwt.verify(token, AUTH_SECRET) as IDecodedUser;
  }
}
