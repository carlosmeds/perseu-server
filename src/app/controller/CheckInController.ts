import { Request } from "express";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CheckInRepo } from "../../infra/postgres/repo/CheckInRepo";
import { TrainingRepo } from "../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../main/presentation/httpHelper";

class CheckInController {
  async athleteCheckIn(req: Request) {
    const { id, athleteId } = req.params;
    const { effort, date } = req.body;

    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(athleteId));
    if (!athlete) {
        return notFound("Atleta não encontrado");
    }

    const trainingRepo = new TrainingRepo();
    const training = await trainingRepo.getTrainingById(Number(id));
    if (!training) {
      return notFound("Atleta não encontrado");
    }

    const checkInRepo = new CheckInRepo();
    const checkIn = await checkInRepo.athleteCheckIn(
      training,
      athlete,
      effort,
      new Date(date)
    );

    return success(checkIn);
  }

  async getCheckInByAthletes(req: Request) {
    const { id } = req.params;

    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const checkInRepo = new CheckInRepo();
    const checkIn = await checkInRepo.getCheckInByAthlete(athlete);

    return success(checkIn);
  }
}

export const checkInController = new CheckInController();
