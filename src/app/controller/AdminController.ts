import { Request } from "express";
import { CountEntitiesUseCase } from "../../domain/usecases/admin/countEntities";
import { GetAdminByIdUseCase } from "../../domain/usecases/admin/getAdminById";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";

class AdminController {
  async countEntities() {
    const countEntitiesUseCase = new CountEntitiesUseCase(
      new AthleteRepo(),
      new CoachRepo(),
      new TeamRepo()
    );

    return await countEntitiesUseCase.execute();
  }

  async getAdminById(req: Request) {
    const { id } = req.params;

    const getAdminByIdUseCase = new GetAdminByIdUseCase(new UserRepo());
    return await getAdminByIdUseCase.execute(Number(id));
  }
}

export const adminController = new AdminController();
