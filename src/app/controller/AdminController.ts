import { Request } from "express";
import { GetStatsUseCase } from "../../domain/usecases/admin/getStats";
import { DeactivateAdminUseCase } from "../../domain/usecases/admin/deactivateAdmin";
import { GetAdminByIdUseCase } from "../../domain/usecases/admin/getAdminById";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";
import { TrainingRepo } from "../../infra/postgres/repo/TrainingRepo";
import { CheckInRepo } from "../../infra/postgres/repo/CheckInRepo";

class AdminController {
  async getStats() {
    const countEntitiesUseCase = new GetStatsUseCase(
      new AthleteRepo(),
      new CoachRepo(),
      new TeamRepo(),
      new TrainingRepo(),
      new CheckInRepo()
    );

    return await countEntitiesUseCase.execute();
  }

  async getAdminById(req: Request) {
    const { id } = req.params;

    const getAdminByIdUseCase = new GetAdminByIdUseCase(new UserRepo());
    return await getAdminByIdUseCase.execute(Number(id));
  }

  async deactivateAdmin(req: Request) {
    const { id } = req.params;

    const deactivateAdminUseCase = new DeactivateAdminUseCase(new UserRepo());
    return await deactivateAdminUseCase.execute(Number(id));
  }
}

export const adminController = new AdminController();
