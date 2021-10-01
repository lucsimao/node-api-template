import { IController } from '../interfaces/IController';
import { SignInController } from '../controllers/SignInController';

export default class SignInControllerFactory {
  public static getController(): IController {
    return new SignInController();
  }
}
