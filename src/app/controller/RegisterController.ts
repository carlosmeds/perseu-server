import { Request, Response } from "express";
import { RegisterRepo } from "../../infra/postgres/repo/registerRepo";

class RegisterController {
  async registerAthlete(req: Request, res: Response, ) {
    const { name, email, password } = req.body;
    const accountMongoRepository = new RegisterRepo();
    const result = await accountMongoRepository.registerAthlete(name, email, password);
    return res.json({
      result
    });
  }
}
export const registerController = new RegisterController();
