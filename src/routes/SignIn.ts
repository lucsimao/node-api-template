import { IWebFramework } from '../util/webFramework/framework/WebFramework';
import { RoutesEnum } from '../config/RoutesEnum';
import SignInControllerFactory from '../factories/SignInControllerFactory';

/**
 * POST /signin
 * @tag Users
 * @summary Authenticate an user.
 * @description Authenticate an user
 * @bodyContent {UserAuth} application/json
 * @bodyRequired
 * @response 201 - The user credentials of authentication
 * @responseContent {AuthenticatedUserResponse} 201.application/json
 * @response 400 - Invalid parameters
 * @responseContent {Error} 400.application/json
 * @response 401 - Unauthorized
 * @responseContent {AuthenticationError} 401.application/json
 * @response 429 - Too Many Requests
 * @responseContent {TooManyRequestsServerError} 429.application/json
 * @response 500 - Internal Server Error
 * @responseContent {InternalServerError} 500.application/json
 */
export class SignInRoutes {
  public static addRoute(webFramework: IWebFramework<unknown>): void {
    const controller = SignInControllerFactory.getController();

    webFramework.post(
      RoutesEnum.SIGN_IN,
      webFramework.execController(controller)
    );
  }
}
