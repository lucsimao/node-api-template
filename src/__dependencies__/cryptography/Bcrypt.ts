import Env from '../../config/Env';
import ICryptography from '../../services/cryptography/ICryptography';
import bcrypt from 'bcrypt';

export default class Bcrypt implements ICryptography {
  public async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, Env.app.cryptography.salt);
  }
  public async verifyHash(
    passwordInRaw: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(passwordInRaw, hashedPassword);
  }
}
