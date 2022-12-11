import { Request } from "express";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";
import { CryptoService } from "../service/crypto.service";
import { UserType } from "../../domain/enum/UserType";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { badRequest, success } from "../../main/presentation/httpHelper";
import { JWTService } from "../service/jwt.service";

class LoginController {
  async login(req: Request) {
    const { email, password } = req.body;

    const userRepo = new UserRepo();
    const user = await userRepo.getUserByEmail(email);

    if (user) {
      const isPasswordCorrect = await CryptoService.compare(
        password,
        user.password
      );
      if (!isPasswordCorrect) {
        return badRequest("Usuário ou senha inválidos");
      }

      const token = JWTService.sign(user.email);

      const userTypeDataAndTeam = await LoginController.getUserTypeDataAndTeam(
        user.type,
        user.id
      );

      return success({
        token,
        user: { id: user.id, email: user.email },
        ...userTypeDataAndTeam,
      });
    } else {
      return badRequest("Usuário ou senha inválidos");
    }
  }

  async checkLogin(req: Request) {
    const { token } = req.body;
    const decodedToken = JWTService.decode(token);

    if (decodedToken?.email) {
      const userRepo = new UserRepo();

      const user = await userRepo.getUserByEmail(decodedToken.email);
      if (user) {
        const token = JWTService.sign(user.email);

        const userTypeDataAndTeam =
          await LoginController.getUserTypeDataAndTeam(user.type, user.id);

        return success({
          token,
          user: { id: user.id, email: user.email },
          ...userTypeDataAndTeam,
        });
      }
      return badRequest("Usuário não encontrado");
    }

    return badRequest("Token inválido");
  }

  async adminLogin(req: Request) {
    const { email, password } = req.body;

    const userRepo = new UserRepo();
    const user = await userRepo.getUserByEmail(email);

    if ((user && user.type === UserType.ADMIN) && !user.deletedAt) {
      const isPasswordCorrect = await CryptoService.compare(
        password,
        user.password
      );
      if (!isPasswordCorrect) {
        return badRequest("Usuário ou senha inválidos");
      }

      const token = JWTService.sign(user.email);

      return success({
        token,
        user: { id: user.id, email: user.email },
      });
    } else {
      return badRequest("Usuário ou senha inválidos");
    }
  }

  static async getUserTypeDataAndTeam(type: string, userId: number) {
    if (type === UserType.ATHLETE) {
      const athleteRepo = new AthleteRepo();
      return await athleteRepo.getAthleteAndTeamByUserId(userId);
    } else {
      const coachRepo = new CoachRepo();
      return await coachRepo.getCoachAndTeamByUserId(userId);
    }
  }
}

export const loginController = new LoginController();
