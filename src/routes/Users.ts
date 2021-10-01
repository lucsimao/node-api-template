import { IWebFramework } from '../util/webFramework/framework/WebFramework';
import { RoutesEnum } from '../config/RoutesEnum';
import UsersControllerFactory from '../factories/UsersControllerFactory';

export default class SignRoutes {
  public static addRoute(webFramework: IWebFramework<unknown>): void {
    const controller = UsersControllerFactory.getController();

    webFramework.get(RoutesEnum.USERS, webFramework.execController(controller));
  }
}
