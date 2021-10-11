import bcrypt from 'bcrypt';
import cryptography from './index';
jest.mock('bcrypt');

describe('Bcrypt Tests', () => {
  describe('generateHash', () => {
    it('should call hash when generateHash is called', () => {
      const hash = jest.spyOn(bcrypt, 'hash').mockReturnValue();

      cryptography.generateHash('fake hash');

      expect(hash).toBeCalledWith('fake hash', 10);
    });
  });
  describe('verifyHash', () => {
    it('should call compare when verifyHash is called', () => {
      const compare = jest.spyOn(bcrypt, 'compare').mockReturnValue();

      cryptography.verifyHash('fake hash', 'fake hashed');

      expect(compare).toBeCalledWith('fake hash', 'fake hashed');
    });
  });
});
