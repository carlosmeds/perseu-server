import { Request, Response, NextFunction } from "express";
import { JWTService } from "../../app/service/jwt.service";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const jwttoken = req.headers["authorization"];
  if (!jwttoken)
    return res.status(401).send("Access denied. No token provided");
  const [, token] = jwttoken.split(" ");

  if (!token) return res.status(401).send("Access denied. No token provided");
  try {
    JWTService.verify(token);
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}
