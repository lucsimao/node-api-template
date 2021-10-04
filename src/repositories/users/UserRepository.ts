import { DatabaseError } from '../../util/errors/DatabaseError';
import { IRepository } from '../IRepository';
import { IRepositoryModel } from '../repositoryModel/IRepositoryModel';
import { IUser } from '../../models/user/IUser';
import httpStatus from 'http-status-codes';
export class UserRepository implements IRepository<IUser> {
  constructor(private readonly UserRepositoryModel: IRepositoryModel<IUser>) {}

  public async create(user: IUser): Promise<IUser> {
    const result = await this.UserRepositoryModel.save(user);

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
    const result = await this.UserRepositoryModel.updateOne(property, user);

    if (!result) {
      throw new DatabaseError(
        `User ${user.email} not found in database`,
        httpStatus.BAD_REQUEST
      );
    }

    return result;
  }

  public async findOne(user: Partial<IUser>): Promise<IUser | undefined> {
    return await this.UserRepositoryModel.findOne(user);
  }

  public async deleteAll(): Promise<void> {
    await this.UserRepositoryModel.deleteAll();
  }

  public async findOneByIdAndToken(
    userId: string,
    token: string
  ): Promise<IUser | undefined> {
    return this.UserRepositoryModel.findOneByIdAndToken(userId, token);
  }
}
