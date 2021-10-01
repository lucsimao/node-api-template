import { IWebFramework } from '../util/webFramework/framework/WebFramework';
import { RoutesEnum } from '../config/RoutesEnum';
import SignUpControllerFactory from '../factories/SignUpControllerFactory';

export default class SignRoutes {
  public static addRoute(webFramework: IWebFramework<unknown>): void {
    const controller = SignUpControllerFactory.getController();

    webFramework.get(
      RoutesEnum.SIGN_UP,
      webFramework.execController(controller)
    );
  }
}
