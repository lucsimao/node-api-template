import { Schema, ValidationError, ValidationResult } from 'joi';

import IValidator from '../../validators/IValidator';
import SchemaValidationError from '../../util/errors/SchemaValidationError';

export class JoiValidator implements IValidator<Schema> {
  public validateSchema<K>(
    schema: Schema<K>,
    value: K,
    errorMessage: string
  ): K {
    const result = schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
    });

    this.validateErrors(result, errorMessage);

    return result.value;
  }

  private validateErrors(result: ValidationResult, errorMessage: string) {
    if (result.error) {
      throw new SchemaValidationError(
        this.parseValidationError(result.error, errorMessage)
      );
    }
  }

  private parseValidationError(
    validationErrors: ValidationError,
    message: string
  ): string {
    const schemaErrorDetails = validationErrors.details
      .map((errorDetail) => errorDetail.message)
      .join(' ');

    return `${message}: ${schemaErrorDetails}`;
  }
}
