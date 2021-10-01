import { IHttpRequest } from './IHttpRequest';
import { IHttpResponse } from './IHttpResponse';

export interface IController {
  executeRoute(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
