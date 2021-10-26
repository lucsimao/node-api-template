import Env from '../../config/Env';
import { LoggerService } from './LoggerService';
import defaultLogger from './index';

jest.mock('pino');
jest.mock('elasticsearch');

describe('LoggerService Tests', () => {
  it('should return env loggers when called', () => {
    process.env.LOGGER_OPTIONS = 'elasticsearch,console';
    (Env as any).appEnvs = undefined;
    const result = LoggerService.getLoggersFromEnv();
    expect(result.length).toBe(2);
  });

  it('should return no loggers when called with empty env', () => {
    expect(defaultLogger).toEqual([]);
  });
});
