import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export function authMiddleware(req: any, res: any, next: any) {
  const jwttoken = req.headers["authorization"];
  if (!jwttoken)
    return res.status(401).send("Access denied. No token provided.");
  const [, token] = jwttoken.split(" ");

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}
