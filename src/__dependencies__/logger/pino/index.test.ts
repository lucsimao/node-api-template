/* eslint-disable @typescript-eslint/no-explicit-any */
import PinoLogger from '.';
import pino from 'pino';

jest.mock('pino', () => {
  return jest.fn().mockReturnValue({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  });
});

describe('Pino Tests', () => {
  describe('Constructor Tests', () => {
    it('should call pino when constructor is called by the first time', () => {
      (PinoLogger as any).pinoLogger = undefined;
      PinoLogger.getInstance();
      expect(pino).toBeCalledWith({ enabled: false });
      expect(pino).toBeCalledTimes(1);
    });
  });

  describe('Info Tests', () => {
    it('should call pino.info when logger.info is called', () => {
      const message = { msg: 'This is a fake info message' };
      const info = jest.spyOn(pino(), 'info');

      PinoLogger.getInstance().info(message);

      expect(info).toBeCalledWith({ msg: 'This is a fake info message' });
    });
  });

  describe('Warning Tests', () => {
    it('should call pino.warn when logger.warning is called', () => {
      const message = { msg: 'This is a fake warning message' };
      const warn = jest.spyOn(pino(), 'warn');

      PinoLogger.getInstance().warning(message);

      expect(warn).toBeCalledWith({ msg: 'This is a fake warning message' });
    });
  });

  describe('Error Tests', () => {
    it('should call pino.warn when logger.warning is called', () => {
      const message = { msg: 'This is a fake error message' };
      const error = jest.spyOn(pino(), 'error');

      PinoLogger.getInstance().error(message);

      expect(error).toBeCalledWith({ msg: 'This is a fake error message' });
    });
  });
});
