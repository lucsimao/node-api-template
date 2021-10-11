import EncryptService from './EncryptService';

describe('EncryptService Tests', () => {
  describe('generateHash', () => {
    it('should return valid token when called', async () => {
      const result = await EncryptService.generateHash('My password');

      expect(result).toEqual(expect.any(String));
    });
  });

  describe('compareHash', () => {
    it('should return valid token when called', async () => {
      const result = await EncryptService.compareHash(
        'My password',
        '$2b$10$1UrIwVnNul9GwA6bIDIQtuWKUWAbstc3.mn0kEbf2xNvGRm3zTxAm'
      );

      expect(result).toEqual(true);
    });

    it('should return valid token when called', async () => {
      const result = await EncryptService.compareHash(
        'My password',
        '$2b$10$1UrIwVnNul9GwA6bIDIQtuWKUWAbstc3.mn0kEbf2xNvGRm3zTxAm'
      );

      expect(result).toEqual(true);
    });
  });
});
