import { IWebFramework } from '../util/webFramework/framework/WebFramework';
import { RoutesEnum } from '../config/RoutesEnum';
import SignInControllerFactory from '../factories/SignInControllerFactory';

export class SignInRoutes {
  public static addRoute(webFramework: IWebFramework<unknown>): void {
    const controller = SignInControllerFactory.getController();

    webFramework.post(
      RoutesEnum.SIGN_IN,
      webFramework.execController(controller)
    );
  }
}
