/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';

import { IUser } from '../../../../models/user/IUser';
import defaultUserFixture from '../../../../../test/fixtures/defaultUserFixture.json';
import mongoRepository from './index';

describe('MongoRepositoryModel Tests', () => {
  const defaultUser = defaultUserFixture as unknown as IUser;

  describe('save', () => {
    it('should call model.save when method save is called', async () => {
      const save = jest.spyOn(Model.prototype, 'save').mockReturnValue('');
      const toJSON = jest.spyOn(Model.prototype, 'toJSON').mockReturnValue('');

      await mongoRepository.save(defaultUser);

      expect(save).toBeCalledWith();
      expect(toJSON).toBeCalledWith();
    });
  });

  describe('findOne', () => {
    it('should call Model.findOne when method findOne is called', async () => {
      const toJSON = jest.fn();
      const findOne = jest
        .spyOn(Model, 'findOne')
        .mockReturnValueOnce({ toJSON } as any);

      await mongoRepository.findOne(defaultUser);

      expect(findOne).toBeCalledWith(defaultUser);
      expect(toJSON).toBeCalledWith();
    });

    it('should return undefined when method findOne return no user', async () => {
      const findOne = jest
        .spyOn(Model, 'findOne')
        .mockReturnValueOnce(undefined as any);

      const result = await mongoRepository.findOne(defaultUser);

      expect(result).toBe(undefined);
      expect(findOne).toBeCalledWith(defaultUser);
    });
  });

  describe('findOneByIdAndToken', () => {
    it('should call Model.findOne when method findOneByIdAndToken is called', async () => {
      const toJSON = jest.fn().mockReturnValue('fake JSON');
      const findOne = jest
        .spyOn(Model, 'findOne')
        .mockReturnValueOnce({ toJSON } as any);
      const objectId = jest
        .spyOn(Types, 'ObjectId')
        .mockReturnValueOnce({ fake: 'id' } as any);

      const result = await mongoRepository.findOneByIdAndToken(
        'Fake Id',
        'Fake Token'
      );

      expect(result).toBe('fake JSON');
      expect(objectId).toBeCalledWith('Fake Id');
      expect(findOne).toBeCalledWith({
        _id: { fake: 'id' },
        token: 'Fake Token',
      });
      expect(toJSON).toBeCalledWith();
    });

    it('should return undefined when method findOneByIdAndToken throw error', async () => {
      const findOne = jest
        .spyOn(Model, 'findOne')
        .mockImplementationOnce(() => {
          throw new Error('Fake error');
        });
      const objectId = jest
        .spyOn(Types, 'ObjectId')
        .mockReturnValueOnce({ fake: 'id' } as any);

      const result = await mongoRepository.findOneByIdAndToken(
        'Fake Id',
        'Fake Token'
      );

      expect(result).toBe(undefined);
      expect(objectId).toBeCalledWith('Fake Id');
      expect(findOne).toBeCalledWith({
        _id: { fake: 'id' },
        token: 'Fake Token',
      });
    });

    it('should return undefined when method findOneByIdAndToken return no user', async () => {
      const findOne = jest
        .spyOn(Model, 'findOne')
        .mockReturnValueOnce(undefined as any);
      const objectId = jest
        .spyOn(Types, 'ObjectId')
        .mockReturnValueOnce({ fake: 'id' } as any);

      const result = await mongoRepository.findOneByIdAndToken(
        'Fake Id',
        'Fake Token'
      );

      expect(result).toBe(undefined);
      expect(objectId).toBeCalledWith('Fake Id');
      expect(findOne).toBeCalledWith({
        _id: { fake: 'id' },
        token: 'Fake Token',
      });
    });
  });

  describe('updateOne', () => {
    it('should call Model.updateOne when method updateOne is called', async () => {
      const updateOne = jest
        .spyOn(Model, 'updateOne')
        .mockReturnValueOnce({ toJSON: jest.fn() } as any);

      await mongoRepository.updateOne(
        { email: 'Fake Email' },
        { email: 'Fake Email' }
      );

      expect(updateOne).toBeCalledWith(
        { email: 'Fake Email' },
        { $set: { email: 'Fake Email' } }
      );
    });
  });

  describe('deleteAll', () => {
    it('should call Model.deleteMany when method deleteAll is called', async () => {
      const deleteMany = jest
        .spyOn(Model, 'deleteMany')
        .mockReturnValueOnce({ toJSON: jest.fn() } as any);

      await mongoRepository.deleteAll();

      expect(deleteMany).toBeCalledWith({});
    });
  });
});
