import { IWebFramework } from '../util/webFramework/framework/WebFramework';
import { RoutesEnum } from '../config/RoutesEnum';
import UsersControllerFactory from '../factories/UsersControllerFactory';

/**
 * GET /users/{id}
 * @tag Users
 * @security apiKey
 * @summary Get information of an user based on Id.
 * @pathParam {string} id
 * @description Get information of an user based on Id
 * @response 200 - The user credentials of authentication
 * @responseContent {AuthenticatedUserResponse} 200.application/json
 * @response 400 - Invalid parameters
 * @responseContent {Error} 400.application/json
 * @response 401 - Unauthorized
 * @responseContent {AuthenticationError} 401.application/json
 * @response 500 - Internal Server Error
 * @responseContent {InternalServerError} 500.application/json
 */
export class UsersRoutes {
  public static addRoute(webFramework: IWebFramework<unknown>): void {
    const controller = UsersControllerFactory.getController();

    webFramework.get(RoutesEnum.USERS, webFramework.execController(controller));
  }
}
