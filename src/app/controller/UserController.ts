import { Request } from "express";
import { GetNameByUserIdUseCase } from "../../domain/usecases/user/getNameByUserId";
import { GetUsersByTeamUseCase } from "../../domain/usecases/user/getUsersByTeam";
import { UpdatePasswordUseCase } from "../../domain/usecases/user/updatePassword";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";
import { success } from "../../main/presentation/httpHelper";
import { Pagination } from "../service/pagination.service";

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
    const admins = await userRepo.getAdmins();
    const result = admins.map((admin) => {
      return {
        id: admin.id,
        email: admin.email,
        createdAt: admin.createdAt,
      };
    });

    return success(result);
  }

  async getCoaches(req: Request) {
    const pages = Pagination.paginate(req.query);

    const userRepo = new UserRepo();
    const [coaches, total] = await userRepo.getCoaches(
      pages.skip,
      pages.pageSize,
      pages.search
    );

    const result = coaches.map((coach) => {
      return {
        id: coach.id,
        name: coach.name,
        email: coach.user.email,
        team: coach?.team?.name ?? null,
        createdAt: coach.createdAt,
      };
    });

    return success({
      coaches: result,
      count: total,
      page: pages.page,
      pageSize: pages.pageSize,
    });
  }

  async getAthletes(req: Request) {
    const pages = Pagination.paginate(req.query);

    const userRepo = new UserRepo();
    const [athletes, total] = await userRepo.getAthletes(
      pages.skip,
      pages.pageSize,
      pages.search
    );

    const result = athletes.map((athlete) => {
      return {
        id: athlete.id,
        name: athlete.name,
        email: athlete.user.email,
        team: athlete?.team?.name ?? null,
        createdAt: athlete.createdAt,
      };
    });

    return success({
      athletes: result,
      count: total,
      page: pages.page,
      pageSize: pages.pageSize,
    });
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
