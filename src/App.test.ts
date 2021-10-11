/* eslint-disable @typescript-eslint/no-explicit-any */
import App from './App';
import Logger from './util/logger';
import { Server } from 'http';
import database from './databases/persistenceDataBase';

jest.mock('./util/webFramework/framework');

describe('App Tests', () => {
  describe('Start Tests', () => {
    it('should call server.listen when start is called', () => {
      const info = jest.spyOn(Logger, 'info');
      const app: any = new App(3000);
      const listen = jest
        .spyOn(app.application, 'startServer')
        .mockImplementationOnce((port: any, callback: any) => {
          callback();
        });

      app.start();

      expect(listen).toBeCalledWith(3000, expect.any(Function));
      expect(info).toBeCalledWith({ msg: 'Starting server on port 3000...' });
      expect(info).toBeCalledWith({
        msg: `Server listening on port 3000`,
      });
    });

    it('should call port 3333 when server is called without params', () => {
      const info = jest.spyOn(Logger, 'info');
      const app = new App();
      const defaultPort = 3333;

      app.start();

      expect(info).toBeCalledWith({
        msg: `Starting server on port ${defaultPort}...`,
      });
    });
  });

  describe('Close Tests', () => {
    it('should resolve the promise when close is called', async () => {
      const app: any = new App();
      app.application = { closeServer: jest.fn() };
      const info = jest.spyOn(Logger, 'info');
      const close = jest.spyOn(app.application, 'closeServer');

      await app.close();

      expect(info).toBeCalledWith({ msg: 'Closing application...' });
      expect(info).toBeCalledWith({ msg: 'Application Closed' });
      expect(close).toBeCalledWith();
    });

    it('should not call server.close when close is called with server undefined', async () => {
      const app: any = new App();
      const close = jest.spyOn(Server.prototype, 'close');

      const promise = await app.close();

      expect(close).not.toBeCalled();
      expect(promise).resolves;
    });

    it('should reject promise when close is called with error', async () => {
      const app: any = new App();
      jest.spyOn(database, 'close').mockImplementationOnce(() => '' as any);
      const info = jest.spyOn(Logger, 'info');
      app.application = {
        closeServer: jest.fn().mockImplementation(() => {
          throw new Error('fake close error');
        }),
      };

      await expect(async () => {
        await app.close();
      }).rejects.toThrow(new Error('fake close error'));

      expect(info).toBeCalledWith({ msg: 'Closing application...' });
    });
  });

  describe('Setup Tests', () => {
    it('should resolve the promise when close is called', async () => {
      jest.spyOn(database as any, 'connect').mockImplementation();
      const info = jest.spyOn(Logger, 'info');
      const app = new App(3000);

      await app.setup();

      expect(info).toBeCalledWith({ msg: 'Starting application setup...' });
      expect(info).toBeCalledWith({ msg: 'Finished application setup' });
      expect(info).toBeCalledWith({ msg: 'Starting routes setup...' });
      expect(info).toBeCalledWith({ msg: 'Finished routes setup' });
      expect(info).toBeCalledWith({ msg: 'Connecting to database...' });
      expect(info).toBeCalledWith({
        msg: 'Connected to database successfully',
      });
    });
  });
  describe('getApp', () => {
    it('should return app when getApp is called', () => {
      const app: any = new App(3000);
      const getApp = jest.spyOn(app.application, 'getApp').mockReturnValue('');

      app.getApp();

      expect(getApp).toBeCalledWith();
    });
  });
});
