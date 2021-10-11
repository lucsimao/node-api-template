/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoDatabase from './index';
import mongoose from 'mongoose';
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    close: jest.fn(),
  },
}));

describe('MongoDatabase Tests', () => {
  describe('connect', () => {
    it('should call mongoose.connect when connect is called', async () => {
      const connect = jest.spyOn(mongoose, 'connect').mockImplementation();
      await mongoDatabase.connect();
      expect(connect).toBeCalledWith(
        `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_ADDRESS}:${process.env.DATABASE_PORT}/`
      );
    });
  });

  describe('close', () => {
    it('should call mongoose.close when close is called', async () => {
      const close = jest
        .spyOn(mongoose.connection as any, 'close')
        .mockImplementation();
      await mongoDatabase.close();
      expect(close).toBeCalledWith();
    });
  });
});
