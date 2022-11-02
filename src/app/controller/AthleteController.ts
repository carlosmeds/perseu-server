import { Request } from "express";
import { GetAthleteUseCase } from "../../domain/usecases/athlete/getAthlete";
import { UpdateAthleteUseCase } from "../../domain/usecases/athlete/updateAthlete";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";

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
}
export const athleteController = new AthleteController();
