import express, { Router } from 'express';

import { ExpressSwagger } from './ExpressSwagger';
import swaggerStats from 'swagger-stats';

const fakeRouter = {
  use: jest.fn(),
} as Partial<Router>;

jest.spyOn(express, 'Router').mockReturnValue(fakeRouter as Router);
jest.mock('openapi-comment-parser', () => () => 'Fake Api Schema');

describe('ExpressSwagger Tests', () => {
  it('should return app when exec is called', () => {
    const expressSwagger = new ExpressSwagger();
    const getMiddleware = jest
      .spyOn(swaggerStats, 'getMiddleware')
      .mockImplementation();

    const result = expressSwagger.exec();

    expect(result).toEqual({ use: expect.any(Function) });
    expect(getMiddleware).toBeCalledWith({ swaggerSpec: 'Fake Api Schema' });
  });
});
