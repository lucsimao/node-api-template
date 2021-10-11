/* eslint-disable @typescript-eslint/no-explicit-any */
import SchemaValidationError from '../../util/errors/SchemaValidationError';
import validator from './index';

describe('JoiValidator Tests', () => {
  describe('validateSchema', () => {
    it('should return a model when receive a valida value', () => {
      const validate = jest.fn().mockReturnValue({});

      validator.validateSchema(
        { validate } as any,
        { email: 'email' },
        'fake error message'
      );

      expect(validate).toBeCalledWith(
        { email: 'email' },
        { abortEarly: false, stripUnknown: true }
      );
    });

    it('should return a model when receive a valida value', () => {
      const validate = jest.fn().mockReturnValue({
        error: { details: [{ message: 'Detail Message' }] },
      });
      expect(() => {
        validator.validateSchema(
          { validate } as any,
          { email: 'email' },
          'fake error message'
        );
      }).toThrow(
        new SchemaValidationError('fake error message: Detail Message')
      );
    });
  });
});
