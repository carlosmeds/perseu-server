export class Code {
  static generate(): string {
    return (Math.random() + 1).toString(36).substring(6).toUpperCase();
  }
}
