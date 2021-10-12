/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express';

import { UsersControllers } from '../../controllers/UsersController';
import expressFramework from './index';

jest.mock('express', () => {
  const express = jest.fn().mockReturnValue({
    use: (callBack?: CallableFunction) => {
      if (callBack instanceof Function) callBack(fakeReq, fakeResp);
    },
    listen: (_port: number, callBack?: CallableFunction) => {
      if (callBack) callBack();
      return { close: jest.fn() };
    },
  });
  Object.setPrototypeOf(express, {
    json: jest.fn().mockReturnValue('json'),
    Router: jest.fn(),
  });
  return express;
});

const fakeReq = {
  params: 'Fake Params',
  headers: 'Fake Headers',
  body: 'Fake Body',
};

const fakeResp = {
  status: () => ({
    json: jest.fn(),
  }),
};

jest
  .spyOn(express, 'Router')
  .mockReturnValue({ post: jest.fn(), get: jest.fn() } as any);

describe('ExpressFramework Tests', () => {
  describe('startServer', () => {
    it('should call app.listen when startServer is called', () => {
      const listen = jest
        .spyOn(express(), 'listen')
        .mockReturnValueOnce('Fake Listen Return' as any);

      expressFramework.startServer(3000, () => ({} as any));

      expect(listen).toBeCalledWith(3000, expect.any(Function));
      expect((expressFramework as any).server).toBe('Fake Listen Return');
    });

    it('should call app.listen when startServer without callback', () => {
      const listen = jest.spyOn(express(), 'listen');

      expressFramework.startServer(3000);

      expect(listen).toBeCalledWith(3000, undefined);
    });
  });

  describe('addMiddleware', () => {
    it('should call methods when addMiddleware', () => {
      const use = jest.spyOn(express(), 'use');

      expressFramework.addMiddleware({
        getMiddleware: jest.fn().mockReturnValue({
          exec: () => ({ statusCode: 0, body: 'Fake Body' }),
        }),
      } as any);

      expect(use).toBeCalledWith({ body: 'Fake Body', statusCode: 0 });
    });
  });

  describe('closeServer', () => {
    it('should call methods when closeServer', () => {
      const close = jest.spyOn((expressFramework as any).server, 'close');

      expressFramework.closeServer();

      expect(close).toBeCalledWith();
    });

    it('should call nothing when closeServer', () => {
      const close = jest.spyOn((expressFramework as any).server, 'close');
      (expressFramework as any).server = undefined;

      expressFramework.closeServer();

      expect(close).not.toBeCalled();
    });
  });

  describe('get', () => {
    it('should call methods when get', () => {
      const get = jest.spyOn(express.Router(), 'get');

      expressFramework.get('/fakeRoute');

      expect(get).toBeCalledWith('/fakeRoute', []);
    });
  });

  describe('post', () => {
    it('should call methods when post', () => {
      const post = jest.spyOn(express.Router(), 'post');

      expressFramework.post('/fakeRoute');

      expect(post).toBeCalledWith('/fakeRoute', []);
    });
  });

  describe('execController', () => {
    it('should call methods when execController', () => {
      const execute = jest.spyOn(UsersControllers.prototype, 'execute');

      const execution = expressFramework.execController(new UsersControllers());
      execution(fakeReq as unknown as Request, fakeResp as unknown as Response);

      expect(execute).toBeCalledWith({
        body: 'Fake Body',
        headers: 'Fake Headers',
        params: 'Fake Params',
      });
    });
  });

  describe('getApp', () => {
    it('should call methods when getApp', () => {
      const app = expressFramework.getApp();
      expect(app).toEqual({
        listen: expect.any(Function),
        use: expect.any(Function),
      });
    });
  });
});
