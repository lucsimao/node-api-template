/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseController } from './BaseController';
import { IHttpRequest } from '../interfaces/IHttpRequest';
import { IHttpResponse } from '../interfaces/IHttpResponse';

class ConcreteController extends BaseController {
  protected async executeRoute(
    httpRequest: IHttpRequest
  ): Promise<IHttpResponse> {
    return { statusCode: 900, body: `Fake Body ${httpRequest}` };
  }
}

const fakeHttpRequest = {
  body: 'Fake HttpRequest Body',
};

describe('BaseController Tests', () => {
  describe('executeRoute', () => {
    it('should call executeRoute when execute is called', async () => {
      const controller = new ConcreteController();
      const result = await controller.execute(fakeHttpRequest);
      expect(result).toEqual({
        body: 'Fake Body [object Object]',
        statusCode: 900,
      });
    });
  });
});
