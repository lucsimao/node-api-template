import { IController } from '../interfaces/IController';
import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';

export class SignInController implements IController {
  public async executeRoute(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return {
      statusCode: 200 || httpRequest,
      body: `Olá, este é meu primeiro get com meu novo template.`,
    };
  }
}
