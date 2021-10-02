import App from '../src/App';
import superTest from 'supertest';

const app = new App();
app.setup();
beforeAll(async () => {
  app.start();
  global.testRequest = superTest(app.getApp());
});

afterAll(async () => {
  await app.close();
});
