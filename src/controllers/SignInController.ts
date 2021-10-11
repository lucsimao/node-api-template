import { BaseController } from '../abstracts/BaseController';
import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import { SignInProvider } from '../providers/SignInProvider';

export class SignInController extends BaseController {
  public async executeRoute(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await SignInProvider.authenticateUser(httpRequest);
  }
}
