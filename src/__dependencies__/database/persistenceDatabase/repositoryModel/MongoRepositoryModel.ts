import mongoose, { Model, model } from 'mongoose';

import { IRepositoryModel } from '../../../../repositories/repositoryModel/IRepositoryModel';
import { IUser } from '../../../../models/user/IUser';
import { UserSchema } from './UserSchema';

export default class MongoUserRepositoryModel
  implements IRepositoryModel<IUser>
{
  private UserModel;

  constructor() {
    this.UserModel = model('User', new UserSchema()) as Model<IUser>;
  }

  public async save(user: IUser): Promise<IUser> {
    const createdUser = new this.UserModel(user);
    await createdUser.save();
    return createdUser.toJSON();
  }

  public async findOne(user: Partial<IUser>): Promise<IUser | undefined> {
    const result = await this.UserModel.findOne(user);
    return result?.toJSON();
  }

  public async findOneByIdAndToken(
    userId: string,
    token: string
  ): Promise<IUser | undefined> {
    try {
      const id = new mongoose.Types.ObjectId(userId);
      const result = await this.UserModel.findOne({
        _id: id,
        token,
      });

      return result?.toJSON();
    } catch (error) {
      return undefined;
    }
  }

  public async updateOne(
    properties: Partial<IUser>,
    model: Partial<IUser>
  ): Promise<IUser | undefined> {
    const result = await this.UserModel.updateOne(
      { email: properties.email },
      { $set: { ...model } }
    );

    return result as unknown as IUser;
  }

  public async deleteAll(): Promise<void> {
    await this.UserModel.deleteMany({});
  }
}
