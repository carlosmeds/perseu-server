import { Request, Response } from "express";
import { UserType } from "../../domain/enum/UserType";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";
import { CryptoService } from "../service/crypto.service";

class RegisterController {
  async registerAthlete(req: Request, res: Response) {
    const { name, document, birthdate, height, weight, email, password } =
      req.body;
    const hashedPassword = await CryptoService.hash(password);

    const userRepo = new UserRepo();
    const userByEmail = await userRepo.getUserByEmail(email);
    if (userByEmail) {
      return res.status(403).json({ error: "Email já está em uso" });
    }
    const user = await userRepo.createUser(email, hashedPassword, UserType.ATHLETE);

    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.createAthlete(
      name,
      document,
      birthdate,
      height,
      weight,
      user
    );

    return res.json({
      id: athlete.id,
      name: athlete.name,
      email: athlete.user.email,
      document: athlete.document,
      birthdate: athlete.birthdate,
      height: athlete.height,
      weight: athlete.weight,
    });
  }
  async registerCoach(req: Request, res: Response) {
    const { name, document, birthdate, cref, email, password } = req.body;
    const hashedPassword = await CryptoService.hash(password);

    const userRepo = new UserRepo();
    const userByEmail = await userRepo.getUserByEmail(email);
    if (userByEmail) {
      return res.status(403).json({ error: "Email já está em uso" });
    }
    const user = await userRepo.createUser(
      email,
      hashedPassword,
      UserType.COACH
    );

    const coachRepo = new CoachRepo();
    const coach = await coachRepo.createCoach(
      name,
      document,
      cref,
      birthdate,
      user
    );

    return res.json({
      id: coach.id,
      name: coach.name,
      email: coach.user.email,
      document: coach.document,
      birthdate: coach.birthdate,
      cref: coach.cref,
    });
  }
}

export const registerController = new RegisterController();
