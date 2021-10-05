import SignUpControllerFactory from '../factories/SignUpControllerFactory';
import { SignUpRoutes } from './SignUp';
import webFramework from '../util/webFramework/framework';

jest.mock('../util/webFramework/framework/WebFramework');
jest.mock('../factories/SignUpControllerFactory');

describe('SignUp Tests', () => {
  describe('addRoute', () => {
    it('should call controller and post when route is called', () => {
      const getController = jest.spyOn(
        SignUpControllerFactory,
        'getController'
      );
      const post = jest.spyOn(webFramework, 'post');

      SignUpRoutes.addRoute(webFramework);

      expect(getController).toBeCalledWith();
      expect(post).toBeCalledWith('/signup', expect.any(Function));
    });
  });
});
