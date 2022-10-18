import { Request } from "express";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { TrainingRepo } from "../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../main/presentation/httpHelper";

class TrainingController {
  async createTraining(req: Request) {
    const { name, athletes, sessions } = req.body;
    const repo = new TrainingRepo();
    const training = await repo.createTraining(name, athletes, sessions);

    return success(training);
  }

  async getTrainingByAthlete(req: Request) {
    const { id } = req.params;

    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const repo = new TrainingRepo();
    const training = await repo.getTrainingByAthlete(athlete);
    if (!training) {
      return notFound("Treino não encontrado");
    }

    return success(training);
  }
}
export const trainingController = new TrainingController();