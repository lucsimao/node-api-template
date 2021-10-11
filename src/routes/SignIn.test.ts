import SignInControllerFactory from '../factories/SignInControllerFactory';
import { SignInRoutes } from './SignIn';
import webFramework from '../__dependencies__/webFramework';

jest.mock('../factories/SignInControllerFactory');
jest.mock('../util/webFramework/framework/WebFramework');

describe('SignIn Tests', () => {
  describe('addRoute', () => {
    it('should call controller and post when route is called', () => {
      const getController = jest.spyOn(
        SignInControllerFactory,
        'getController'
      );
      const post = jest.spyOn(webFramework, 'post');

      SignInRoutes.addRoute(webFramework);

      expect(getController).toBeCalledWith();
      expect(post).toBeCalledWith('/signin', expect.any(Function));
    });
  });
});
