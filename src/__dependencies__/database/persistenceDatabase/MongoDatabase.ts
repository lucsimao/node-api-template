import mongoose, { Mongoose } from 'mongoose';

import Env from '../../../config/Env';
import { IDatabase } from '../../../databases/persistenceDataBase/IDatabase';

const DATABASE_ENV = Env.app.database;

export default class MongoDatabase implements IDatabase<Mongoose> {
  public async connect(): Promise<Mongoose> {
    const url = this.parseMongoConnectionString();
    return await mongoose.connect(url);
  }

  public async close(): Promise<void> {
    await mongoose.connection.close();
  }

  private parseMongoConnectionString(): string {
    return `mongodb://${`${DATABASE_ENV.username}:${encodeURIComponent(
      DATABASE_ENV.password
    )}@`}${DATABASE_ENV.address}:${DATABASE_ENV.port}/`;
  }
}
