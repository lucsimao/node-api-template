export interface ILoggerParams {
  msg: string;
}
export interface ILogger {
  info(message: ILoggerParams): void;
  warning(message: ILoggerParams): void;
  error(message: ILoggerParams): void;
}
