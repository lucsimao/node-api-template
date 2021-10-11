import { BaseController } from '../abstracts/BaseController';
import { UsersControllers } from '../controllers/UsersController';

export default class UsersControllerFactory {
  public static getController(): BaseController {
    return new UsersControllers();
  }
}
