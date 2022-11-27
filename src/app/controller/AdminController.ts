import { CountEntitiesUseCase } from "../../domain/usecases/admin/countEntities";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";

class AdminController {
  async countEntities() {
    const countEntitiesUseCase = new CountEntitiesUseCase(
      new AthleteRepo(),
      new CoachRepo(),
      new TeamRepo()
    );

    return await countEntitiesUseCase.execute();
  }
}

export const adminController = new AdminController();
