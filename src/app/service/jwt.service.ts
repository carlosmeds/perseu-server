import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../main/config/env";

export class JWTService {
  static verify(token: string) {
    jwt.verify(token, JWT_SECRET!);
  }

  static sign(email: any) {
    return jwt.sign({ email }, JWT_SECRET!, {
      expiresIn: "10h",
    });
  }

  static decode(token: string): any {
    return jwt.decode(token);
  }
}
