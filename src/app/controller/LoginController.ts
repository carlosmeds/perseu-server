import { Request, Response } from "express";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";
import { JWT_SECRET } from "../../main/config/env";
import jwt from "jsonwebtoken";

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }

      const userRepo = new UserRepo();
      const user = await userRepo.getUser(email);

      if (user) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET!, {
          expiresIn: "2h",
        });
        res.status(200).json({ token });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const loginController = new LoginController();
