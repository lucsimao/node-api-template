import { UserProvider } from '../providers/UserProvider';
import { UsersControllers } from './UsersController';

const fakeHttpRequest = {
  body: 'Fake HttpRequest Body',
};

describe('UserController Tests', () => {
  describe('executeRoute', () => {
    it('should call UserProvider.getUser when executeRoute is called', () => {
      const getUser = jest.spyOn(UserProvider, 'getUser');
      new UsersControllers().execute(fakeHttpRequest);
      expect(getUser).toBeCalledWith({ body: 'Fake HttpRequest Body' });
    });
  });
});
