export interface ILoggerParams {
  msg: string;
  [key: string]: unknown;
}
export interface ILogger {
  info(message: ILoggerParams): void;
  warning(message: ILoggerParams): void;
  error(message: ILoggerParams): void;
}
