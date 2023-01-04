import { Request } from "express";
import { DeleteAthleteUseCase } from "../../domain/usecases/athlete/deleteAthlete";
import { GetAthleteUseCase } from "../../domain/usecases/athlete/getAthlete";
import { UpdateAthleteUseCase } from "../../domain/usecases/athlete/updateAthlete";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";

class AthleteController {
  async getAthlete(req: Request) {
    const { id } = req.params;
    const athleteRepo = new AthleteRepo();

    const getAthleteUseCase = new GetAthleteUseCase(athleteRepo);
    return await getAthleteUseCase.execute(Number(id));
  }

  async updateAthlete(req: Request) {
    const { id } = req.params;
    const athleteRepo = new AthleteRepo();

    const updateAthleteUseCase = new UpdateAthleteUseCase(athleteRepo);
    return await updateAthleteUseCase.execute(Number(id), req.body);
  }

  async deleteAthlete(req: Request) {
    const { id } = req.params;

    const deleteAthleteUseCase = new DeleteAthleteUseCase(
      new AthleteRepo(),
      new UserRepo()
    );
    return await deleteAthleteUseCase.execute(Number(id));
  }
}
export const athleteController = new AthleteController();
