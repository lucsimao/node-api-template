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

    await this.verifyDuplicatedEmail(user);

    await this.setHashedPassword(user);

    const result = await this.createUserInDatabase(user, token);

    return {
      statusCode: httpStatus.CREATED,
      body: result,
    };
  }

  private static async verifyDuplicatedEmail(user: IUser) {
    const result = await userRepository.findOne({ email: user.email });

    if (result) {
      throw new DuplicationError('Email');
    }
  }

  private static async setHashedPassword(user: IUser) {
    const senha = await EncryptService.generateHash(user.senha);
    user.senha = senha;
  }

  private static async createUserInDatabase(user: IUser, token: string) {
    return await userRepository.create({
      ...user,
      token,
    });
  }
}
