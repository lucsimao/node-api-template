import Main, { ExitStatus } from './Main';

/* eslint-disable @typescript-eslint/no-explicit-any */
import App from './App';
import Logger from './util/logger';

jest.mock('./App');

describe('Index Tests', () => {
  describe('Main Tests', () => {
    describe('Start Tests', () => {
      it('should call app when start is called', async () => {
        const start = jest.spyOn(App.prototype, 'start');
        const setupUncaughtExceptions = jest.spyOn(
          Main as any,
          'setupUncaughtExceptions'
        );
        const setupUnhandledRejection = jest.spyOn(
          Main as any,
          'setupUnhandledRejection'
        );
        const setupGracefulShutdown = jest.spyOn(
          Main as any,
          'setupGracefulShutdown'
        );

        await Main.start();

        expect(start).toBeCalledWith();
        expect(setupUncaughtExceptions).toBeCalledWith();
        expect(setupUnhandledRejection).toBeCalledWith();
        expect(setupGracefulShutdown).toBeCalledWith(expect.any(App));
      });

      it('should call process.exit when start throw a error', async () => {
        const start = jest
          .spyOn(App.prototype, 'start')
          .mockImplementationOnce(() => {
            throw new Error('fake Error');
          });
        const exit = jest.spyOn(process, 'exit').mockImplementation();
        const error = jest.spyOn(Logger, 'error');

        await Main.start();

        expect(start).toBeCalledWith();
        expect(exit).toBeCalledWith(ExitStatus.Failure);
        expect(error).toBeCalledWith({
          msg: 'App exited with error: Error: fake Error',
        });
      });
    });

    describe('setupUncaughtExceptions Tests', () => {
      it('should call process.on and return error when receive a error', () => {
        const on = jest.spyOn(process as any, 'on').mockImplementation(
          jest
            .fn()
            .mockImplementationOnce((type, callback: (err: any) => any) => {
              if (callback) callback(new Error('fake UncaughtException'));
            })
        );
        const exit = jest.spyOn(process, 'exit').mockImplementation();
        const main = Main as any;
        const error = jest.spyOn(Logger, 'error');

        main.setupUncaughtExceptions();

        expect(on).toBeCalledWith('uncaughtException', expect.any(Function));
        expect(exit).toBeCalledWith(ExitStatus.Failure);
        expect(error).toBeCalledWith({
          msg: 'App exiting due to an uncaught exception: Error: fake UncaughtException',
        });
      });
    });

    describe('SetupUnhandledRejection Tests', () => {
      it('should call process.on and return error when receive a error', () => {
        const on = jest.spyOn(process as any, 'on').mockImplementationOnce(
          jest
            .fn()
            .mockImplementation(
              (type, callback: (err: any, promise: any) => any) => {
                if (callback)
                  callback(
                    new Error('fake UnhandledRejection'),
                    'fake promise'
                  );
              }
            )
        );
        const main = Main as any;
        const error = jest.spyOn(Logger, 'error');

        expect(() => {
          main.setupUnhandledRejection();
        }).toThrow(new Error('fake UnhandledRejection'));

        expect(on).toBeCalledWith('unhandledRejection', expect.any(Function));
        expect(error).toBeCalledWith({
          msg: 'App exiting due to an unhandled promise: fake promise and reason: Error: fake UnhandledRejection',
        });
      });
    });

    describe('SetupGracefulShutdown Tests', () => {
      it('should call process.on when setupGracefulShutdown is called', async () => {
        const on = jest.spyOn(process as any, 'on').mockImplementationOnce(
          jest
            .fn()
            .mockImplementation(async (type, callback: () => Promise<any>) => {
              if (callback) await callback();
            })
        );
        const main = Main as any;
        const info = jest.spyOn(Logger, 'info');
        const exit = jest.spyOn(process, 'exit').mockImplementation();
        const app = {
          close: jest.fn().mockImplementation(() => {
            Promise.resolve;
          }),
        };

        await main.setupGracefulShutdown(app);

        expect(on).toBeCalledWith('SIGINT', expect.any(Function));
        expect(on).toBeCalledWith('SIGTERM', expect.any(Function));
        expect(on).toBeCalledWith('SIGQUIT', expect.any(Function));
        expect(info).toBeCalledWith({
          msg: 'Graceful shutdown starting...',
        });

        expect(app.close).toBeCalledWith();
        expect(info).toBeCalledWith({ msg: `App exited with success` });
        expect(exit).toBeCalledWith(ExitStatus.Success);
      });
    });
  });
});
