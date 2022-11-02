import { Request } from "express";
import { AthleteCheckInUseCase } from "../../domain/usecases/checkin/athleteCheckIn";
import { GetCheckInByAthleteUseCase } from "../../domain/usecases/checkin/getCheckInByAthlete";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CheckInRepo } from "../../infra/postgres/repo/CheckInRepo";
import { TrainingRepo } from "../../infra/postgres/repo/TrainingRepo";

class CheckInController {
  async athleteCheckIn(req: Request) {
    const { id, athleteId } = req.params;
    const { effort, date } = req.body;

    const athleteCheckInUseCase = new AthleteCheckInUseCase(
      new TrainingRepo(),
      new AthleteRepo(),
      new CheckInRepo()
    );
    return await athleteCheckInUseCase.execute(
      Number(id),
      Number(athleteId),
      Number(effort),
      new Date(date)
    );
  }

  async getCheckInByAthlete(req: Request) {
    const { id } = req.params;
    const athleteRepo = new AthleteRepo();
    const checkInRepo = new CheckInRepo();

    const getCheckInByAthletesUseCase = new GetCheckInByAthleteUseCase(
      athleteRepo,
      checkInRepo
    );
    return await getCheckInByAthletesUseCase.execute(Number(id));
  }
}

export const checkInController = new CheckInController();
