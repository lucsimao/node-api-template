import { DatabaseError } from '../../util/errors/DatabaseError';
import { IRepository } from '../IRepository';
import { IUser } from '../../models/user/IUser';
import httpStatus from 'http-status-codes';
import repositoryModel from '../../__dependencies__/database/persistence/repositoryModel';

export class UserRepository implements IRepository<IUser> {
  public async create(user: IUser): Promise<IUser> {
    const result = await repositoryModel.save(user);

    if (!result) {
      throw new DatabaseError(
        `Could not save user ${user.email} in database`,
        httpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  public async update(
    property: Partial<IUser>,
    user: Partial<IUser>
  ): Promise<IUser> {
    const result = await repositoryModel.updateOne(property, user);

    if (!result) {
      throw new DatabaseError(
        `User ${user.email} not found in database`,
        httpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  public async findOne(user: Partial<IUser>): Promise<IUser | undefined> {
    return await repositoryModel.findOne(user);
  }

  public async deleteAll(): Promise<void> {
    await repositoryModel.deleteAll();
  }

  public async findOneByIdAndToken(
    userId: string,
    token: string
  ): Promise<IUser | undefined> {
    return repositoryModel.findOneByIdAndToken(userId, token);
  }
}
