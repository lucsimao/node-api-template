export default interface ICryptography {
  generateHash(password: string): Promise<string>;
  verifyHash(passwordInRaw: string, hashedPassword: string): Promise<boolean>;
}
