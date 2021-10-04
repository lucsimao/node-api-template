import App from '../src/App';
import superTest from 'supertest';

const app = new App();

beforeAll(async () => {
  await app.setup();
  global.testRequest = superTest(app.getApp());
});

afterAll(async () => {
  await app.close();
});
