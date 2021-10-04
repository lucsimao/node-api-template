import { BaseController } from '../abstracts/BaseController';
import { SignUpController } from '../controllers/SignUpController';

export default class SignUpControllerFactory {
  public static getController(): BaseController {
    return new SignUpController();
  }
}
