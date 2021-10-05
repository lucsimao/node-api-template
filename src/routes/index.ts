import { IWebFramework } from '../util/webFramework/framework/WebFramework';
import { SignInRoutes } from './SignIn';
import { SignUpRoutes } from './SignUp';
import { UsersRoutes } from './Users';

export default {
  setup: (webFramework: IWebFramework<unknown>): void => {
    SignInRoutes.addRoute(webFramework);
    SignUpRoutes.addRoute(webFramework);
    UsersRoutes.addRoute(webFramework);
  },
};
