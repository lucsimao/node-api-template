import { IMiddleware } from '../../util/webFramework/framework/WebFramework';
import { Router } from 'express';
import openapi from 'openapi-comment-parser';
import openapiConfig from '../../openapirc';
import swaggerStats from 'swagger-stats';
import swaggerUi from 'swagger-ui-express';

export class ExpressSwagger implements IMiddleware<Router> {
  public exec(): Router {
    const app = Router();
    const apiSchema = openapi(openapiConfig);

    app.use(swaggerStats.getMiddleware({ swaggerSpec: apiSchema }));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));

    return app;
  }
}
