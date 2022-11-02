import { Request } from "express";
import { CreateTrainingUseCase } from "../../domain/usecases/training/createTraining";
import { GetTrainingUseCase } from "../../domain/usecases/training/getTraining";
import { GetTrainingsByTeamUseCase } from "../../domain/usecases/training/getTrainingsByTeam";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { TrainingRepo } from "../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../main/presentation/httpHelper";

class TrainingController {
  async createTraining(req: Request) {
    const { id } = req.params;
    const teamRepo = new TeamRepo();
    const trainingRepo = new TrainingRepo();

    const createTrainingUseCase = new CreateTrainingUseCase(
      trainingRepo,
      teamRepo
    );
    return await createTrainingUseCase.execute(Number(id), req.body);
  }

  async getTrainingByAthlete(req: Request) {
    const { id } = req.params;

    const athleteRepo = new AthleteRepo();
    const repo = new TrainingRepo();
    
    const getTrainingUseCase = new GetTrainingUseCase(repo, athleteRepo);
    return await getTrainingUseCase.execute(Number(id));
  }

  async getTrainingsByTeam(req: Request) {
    const { id } = req.params;

    const teamRepo = new TeamRepo();
    const repo = new TrainingRepo();
    
    const getTrainingsByTeamUseCase = new GetTrainingsByTeamUseCase(repo, teamRepo);
    return await getTrainingsByTeamUseCase.execute(Number(id));
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

  async getTrainingById(req: Request) {
    const { id } = req.params;

    const repo = new TrainingRepo();
    const training = await repo.getTrainingById(Number(id));
    if (!training) {
      return notFound("Treino não encontrado");
    }

    return success(training);
  }
}

export const trainingController = new TrainingController();
