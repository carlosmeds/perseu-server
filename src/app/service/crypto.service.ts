import bcrypt from "bcrypt";

export class CryptoService {
  static async hash(plaintext: string): Promise<string> {
    const salt = 12
    return bcrypt.hash(plaintext, salt);
  }

  static async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}
