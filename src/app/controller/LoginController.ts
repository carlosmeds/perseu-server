import { Request, Response } from "express";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";
import { JWT_SECRET } from "../../main/config/env";
import jwt from "jsonwebtoken";
import { CryptoService } from "../service/crypto.service";
import { UserType } from "../../domain/enum/UserType";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { UserStatus } from "../../domain/enum/UserStatus";
import { RequestRepo } from "../../infra/postgres/repo/RequestRepo";
import { Athlete } from "../../infra/postgres/schema/Athlete.schema";

class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const userRepo = new UserRepo();
    const user = await userRepo.getUserByEmail(email);

    if (user) {
      const isPasswordCorrect = await CryptoService.compare(
        password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).send("Usuário ou senha inválidos");
      }

      const token = jwt.sign({ email: user.email }, JWT_SECRET!, {
        expiresIn: "2h",
      });

      const userTypeDataAndTeam = await LoginController.getUserTypeDataAndTeam(user.type, user.id);

      res.status(200).json({
        token,
        user: { id: user.id, email: user.email },
        ...userTypeDataAndTeam,
      });
    }
  }

  static async getUserTypeDataAndTeam(type: string, userId: number) {
    if (type === UserType.ATHLETE) {
      const athleteRepo = new AthleteRepo();
      const result = await athleteRepo.getAthleteAndTeamByUserId(userId);
      return {
        status: result.team.id
          ? UserStatus.ATHLETE_WITH_TEAM
          : await LoginController.checkAthleteRequestStatus(result.athleteObject),
        ...result,
      };
    } else {
      const coachRepo = new CoachRepo();
      const result =  await coachRepo.getCoachAndTeamByUserId(userId);
      return {
        status: result.team.id ? UserStatus.COACH_WITH_TEAM : UserStatus.COACH_WITHOUT_TEAM,
        ...result,
      }
    }
  }

  static async checkAthleteRequestStatus(athlete: Athlete) {
    const requestRepo = new RequestRepo();
    const athleteRequest = await requestRepo.getRequestByAthlete(athlete);
    if (athleteRequest) {
      return UserStatus.ATHLETE_WITH_PENDING_TEAM;
    }
    return UserStatus.ATHLETE_WITHOUT_TEAM;
  }
}

export const loginController = new LoginController();
