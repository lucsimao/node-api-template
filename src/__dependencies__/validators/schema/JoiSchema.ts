import { ISchema, ISchemaObject } from '../../../validators/ISchema';
import Joi, { AnySchema } from 'joi';

export class JoiSchema implements ISchema<AnySchema> {
  object(schemaObject: ISchemaObject<AnySchema>): AnySchema {
    return Joi.object(schemaObject);
  }
  string(): AnySchema {
    return Joi.string();
  }
  email(): AnySchema {
    return Joi.string().email();
  }
  array(schemaObject: AnySchema): AnySchema {
    return Joi.array().items(schemaObject);
  }
}
