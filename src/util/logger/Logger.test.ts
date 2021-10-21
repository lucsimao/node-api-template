import { Logger } from './Logger';

const fakeLogger = {
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
};

describe('Logger Tests', () => {
  describe('info', () => {
    it('should call info when logger.info is called', () => {
      const info = jest.spyOn(fakeLogger, 'info');
      const logger = new Logger();
      logger.addLogger(fakeLogger);

      logger.info({ msg: 'logger' });
      expect(info).toBeCalledWith({ msg: 'logger' });
    });
  });

  describe('warning', () => {
    it('should call warning when logger.warning is called', () => {
      const warning = jest.spyOn(fakeLogger, 'warning');
      const logger = new Logger();
      logger.addLogger(fakeLogger);

      logger.warning({ msg: 'logger' });
      expect(warning).toBeCalledWith({ msg: 'logger' });
    });
  });

  describe('error', () => {
    it('should call error when logger.error is called', () => {
      const error = jest.spyOn(fakeLogger, 'error');
      const logger = new Logger();
      logger.addLogger(fakeLogger);

      logger.error({ msg: 'logger' });
      expect(error).toBeCalledWith({ msg: 'logger' });
    });
  });
});
