import cryptography from './cryptography';
export default class EncryptService {
  public static async generateHash(password: string): Promise<string> {
    return await cryptography.generateHash(password);
  }

  public static async compareHash(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await cryptography.verifyHash(password, hashedPassword);
  }
}
