import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';

export abstract class BaseController {
  protected abstract executeRoute(
    httpRequest: IHttpRequest
  ): Promise<IHttpResponse>;

  public async execute(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await this.executeRoute(httpRequest);
  }
}
