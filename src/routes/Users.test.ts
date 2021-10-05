import UsersControllerFactory from '../factories/UsersControllerFactory';
import { UsersRoutes } from './Users';
import webFramework from '../util/webFramework/framework';

jest.mock('../util/webFramework/framework/WebFramework');
jest.mock('../factories/UsersControllerFactory');

describe('Users Tests', () => {
  describe('addRoute', () => {
    it('should call controller and get when route is called', () => {
      const getController = jest.spyOn(UsersControllerFactory, 'getController');
      const get = jest.spyOn(webFramework, 'get');

      UsersRoutes.addRoute(webFramework);

      expect(getController).toBeCalledWith();
      expect(get).toBeCalledWith('/users/:id', expect.any(Function));
    });
  });
});
