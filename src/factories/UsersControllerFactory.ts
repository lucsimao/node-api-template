import { IController } from '../interfaces/IController';
import { UsersController } from '../controllers/UsersController';

export default class UsersControllerFactory {
  public static getController(): IController {
    return new UsersController();
  }
}
