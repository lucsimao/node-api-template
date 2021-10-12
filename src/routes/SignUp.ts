import { IWebFramework } from '../util/webFramework/framework/WebFramework';
import { RoutesEnum } from '../config/RoutesEnum';
import SignUpControllerFactory from '../factories/SignUpControllerFactory';

/**
 * POST /signup
 * @tag Users
 * @summary Create a new user.
 * @description Create a new user
 * @bodyContent {User} application/json
 * @bodyRequired
 * @response 201 - The user has been created
 * @responseContent {UserCreatedResponse} 201.application/json
 * @response 400 - Invalid parameters
 * @responseContent {Error} 400.application/json
 * @response 401 - Unauthorized
 * @responseContent {AuthenticationError} 401.application/json
 * @response 500 - Internal Server Error
 * @responseContent {InternalServerError} 500.application/json
 */
export class SignUpRoutes {
  public static addRoute(webFramework: IWebFramework<unknown>): void {
    const controller = SignUpControllerFactory.getController();

    webFramework.post(
      RoutesEnum.SIGN_UP,
      webFramework.execController(controller)
    );
  }
}
