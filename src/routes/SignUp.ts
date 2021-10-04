import { IWebFramework } from '../util/webFramework/framework/WebFramework';
import { RoutesEnum } from '../config/RoutesEnum';
import SignUpControllerFactory from '../factories/SignUpControllerFactory';

export default class SignUpRoutes {
  public static addRoute(webFramework: IWebFramework<unknown>): void {
    const controller = SignUpControllerFactory.getController();

    webFramework.post(
      RoutesEnum.SIGN_UP,
      webFramework.execController(controller)
    );
  }
}
