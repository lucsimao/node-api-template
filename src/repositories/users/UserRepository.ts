import { IRepository } from '../IRepository';
import { IRepositoryModel } from '../repositoryModel/IRepositoryModel';
import { IUser } from '../../models/user/IUser';

export class UserRepository implements IRepository<IUser> {
  constructor(private readonly UserRepositoryModel: IRepositoryModel<IUser>) {}

  public async create(model: IUser): Promise<IUser> {
    const user = await this.UserRepositoryModel.save(model);
    return user;
  }

  public async update(user: Partial<IUser>): Promise<IUser> {
    const result = await this.UserRepositoryModel.updateOne(
      { email: user.email },
      { ...user }
    );

    if (!result) {
      throw new Error('');
    }

    return result;
  }

  public async findOne(user: Partial<IUser>): Promise<IUser> {
    const result = await this.UserRepositoryModel.findOne({
      email: user.email,
    });

    if (!result) {
      throw new Error('');
    }

    return result;
  }
}
