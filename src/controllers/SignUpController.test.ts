import Logger from '../util/logger';
import { SignUpController } from './SignUpController';
import { SignUpProvider } from '../providers/SignUpProvider';

jest.mock('../providers/SignUpProvider');

const fakeHttpRequest = {
  body: 'Fake HttpRequest Body',
};

describe('SignUpController Tests', () => {
  describe('executeRoute', () => {
    it('should call SignUpProvider.generateUser when executeRoute is called', () => {
      const generateUser = jest.spyOn(SignUpProvider, 'generateUser');
      const info = jest.spyOn(Logger, 'info');

      new SignUpController().execute(fakeHttpRequest);

      expect(info).toBeCalledWith({
        msg: 'Creating user: "Fake HttpRequest Body"',
      });
      expect(generateUser).toBeCalledWith('Fake HttpRequest Body');
    });
  });
});
