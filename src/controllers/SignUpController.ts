import { BaseController } from '../abstracts/BaseController';
import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import { IUser } from '../models/user/IUser';
import Logger from '../util/logger';
import { SignUpProvider } from '../providers/SignUpProvider';

export class SignUpController extends BaseController {
  public async executeRoute(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    Logger.info({ msg: `Creating user: ${JSON.stringify(httpRequest.body)}` });
    return await SignUpProvider.generateUser(httpRequest.body as IUser);
  }
}
