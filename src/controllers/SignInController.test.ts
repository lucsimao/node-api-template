import { SignInController } from './SignInController';
import { SignInProvider } from '../providers/SignInProvider';

jest.mock('../providers/SignInProvider');
const fakeHttpRequest = {
  body: 'Fake HttpRequest Body',
};

describe('SignInController Tests', () => {
  describe('executeRoute', () => {
    it('should call authenticateUser when executeRoute is called', () => {
      const authenticateUser = jest.spyOn(SignInProvider, 'authenticateUser');
      new SignInController().execute(fakeHttpRequest);
      expect(authenticateUser).toBeCalledWith({
        body: 'Fake HttpRequest Body',
      });
    });
  });
});
