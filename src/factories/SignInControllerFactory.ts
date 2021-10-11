import { BaseController } from '../abstracts/BaseController';
import { SignInController } from '../controllers/SignInController';

export default class SignInControllerFactory {
  public static getController(): BaseController {
    return new SignInController();
  }
}
