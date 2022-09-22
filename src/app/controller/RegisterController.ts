import { Request, Response } from "express";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";

class RegisterController {
  async registerAthlete(req: Request, res: Response) {
    const { name, document, birthdate, email, password } = req.body;
    const userRepo = new UserRepo();
    const user = await userRepo.createUser(email, password);
    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.createAthlete(
      name,
      document,
      birthdate,
      user
    );

    return res.json({
      name: athlete.name,
      email: athlete.user.email,
      document: athlete.document,
      birthdate: athlete.birthdate,
    });
  }
}

export const registerController = new RegisterController();
