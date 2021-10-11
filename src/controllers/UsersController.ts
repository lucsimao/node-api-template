import { BaseController } from '../abstracts/BaseController';
import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import { UserProvider } from '../providers/UserProvider';

export class UsersControllers extends BaseController {
  public async executeRoute(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await UserProvider.getUser(httpRequest);
  }
}
