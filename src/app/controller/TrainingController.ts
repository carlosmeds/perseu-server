import { Request } from "express";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { TrainingRepo } from "../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../main/presentation/httpHelper";

class TrainingController {
  async createTraining(req: Request) {
    const { id } = req.params;
    const { name, athletes, sessions } = req.body;

    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeam(Number(id));
    if (!team) {
      return notFound("Time não encontrado");
    }

    const repo = new TrainingRepo();
    const training = await repo.createTraining(team, name, athletes, sessions);

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

  async getTrainingsByTeam(req: Request) {
    const { id } = req.params;

    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeam(Number(id));
    if (!team) {
      return notFound("Time não encontrado");
    }

    const repo = new TrainingRepo();
    const trainings = await repo.getTrainingsByTeam(team);

    return success(trainings);
  }

  async assignTrainingById(req: Request) {
    const { id } = req.params;
    const { athletes } = req.body;

    const athleteRepo = new AthleteRepo();
    const athletesFound = await Promise.all(
      athletes.map(async (id: any) => {
        const result = await athleteRepo.getAthlete(Number(id));
        return result;
      })
    );

    const repo = new TrainingRepo();
    const training = await repo.getTrainingById(Number(id));
    if (!training) {
      return notFound("Treino não encontrado");
    }

    await repo.assignTrainingById(athletesFound, training);

    return success({ message: "Treino atribuído com sucesso" });
  }
}

export const trainingController = new TrainingController();
