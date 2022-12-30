import { CryptoService } from "../../../app/service/crypto.service";
import { JWTService } from "../../../app/service/jwt.service";
import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { badRequest, success } from "../../../main/presentation/httpHelper";
import { UserType } from "../../enum/UserType";
import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";

export class LoginUseCase {
  constructor(private userRepo: UserRepo) {}

  async execute(email: string, password: string): Promise<any> {
    const user = await this.userRepo.getUserByEmail(email);

    if (user) {
      const isPasswordCorrect = await CryptoService.compare(
        password,
        user.password
      );
      if (!isPasswordCorrect) {
        return badRequest("Usuário ou senha inválidos");
      }

      const token = JWTService.sign(user.email);

      const userTypeDataAndTeam = await LoginUseCase.getUserTypeDataAndTeam(
        user.type,
        user.id
      );

      return success({
        token,
        user: { id: user.id, email: user.email },
        ...userTypeDataAndTeam,
      });
    }

    return badRequest("Usuário ou senha inválidos");
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
