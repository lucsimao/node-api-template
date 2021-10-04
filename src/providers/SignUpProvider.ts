import AuthService from '../services/AuthService';
import { DuplicationError } from '../util/errors/DuplicationError';
import EncryptService from '../services/EncryptService';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import { IUser } from '../models/user/IUser';
import UserSchema from '../schemas/UserSchema';
import httpStatus from 'http-status-codes';
import userRepository from '../repositories/users';
import validator from '../validators';
export class SignUpProvider {
  public static async generateUser(user: IUser): Promise<IHttpResponse> {
    const validatedUserData = await validator.validateSchema<IUser>(
      UserSchema,
      user,
      'error validating schema'
    );

    const token = AuthService.generateUserToken(validatedUserData);

    const senha = await EncryptService.generateHash(user.senha);
    user.senha = senha;

    const userInDatabase = await userRepository.findOne({ email: user.email });

    if (userInDatabase) {
      throw new DuplicationError('Email');
    }

    const result = await userRepository.create({
      ...user,
      token,
    });

    return {
      body: result,
      statusCode: httpStatus.CREATED,
    };
  }
}
