import { Request } from "express";
import { GetAdminsUseCase } from "../../domain/usecases/user/getAdmins";
import { GetAthletesUseCase } from "../../domain/usecases/user/getAthletes";
import { GetCoachesUseCase } from "../../domain/usecases/user/getCoaches";
import { GetNameByUserIdUseCase } from "../../domain/usecases/user/getNameByUserId";
import { GetUsersByTeamUseCase } from "../../domain/usecases/user/getUsersByTeam";
import { UpdatePasswordUseCase } from "../../domain/usecases/user/updatePassword";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";

class UserController {
  async updatePassword(req: Request) {
    const { id } = req.params;
    const { newPassword, oldPassword } = req.body;
    const userRepo = new UserRepo();

    const updatePasswordUseCase = new UpdatePasswordUseCase(userRepo);
    return await updatePasswordUseCase.execute(
      Number(id),
      newPassword,
      oldPassword
    );
  }

  async getAdmins() {
    const userRepo = new UserRepo();

    const getAdminsUseCase = new GetAdminsUseCase(userRepo);
    return await getAdminsUseCase.execute();
  }

  async getCoaches(req: Request) {
    const getCoachesUseCase = new GetCoachesUseCase(new UserRepo());

    return await getCoachesUseCase.execute(req.query);
  }

  async getAthletes(req: Request) {
    const getAthletesUseCase = new GetAthletesUseCase(new UserRepo());

    return await getAthletesUseCase.execute(req.query);
  }

  async getUsersByTeamId(req: Request) {
    const { id } = req.params;

    const getUsersByTeam = new GetUsersByTeamUseCase(
      new TeamRepo(),
      new UserRepo(),
      new CoachRepo()
    );
    return await getUsersByTeam.execute(Number(id));
  }

  async getNameByUserId(req: Request) {
    const { id } = req.params;

    const getNameByUserId = new GetNameByUserIdUseCase(
      new UserRepo(),
      new AthleteRepo(),
      new CoachRepo()
    );
    return await getNameByUserId.execute(Number(id));
  }
}

export const userController = new UserController();
