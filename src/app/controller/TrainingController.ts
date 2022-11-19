import { Request } from "express";
import { AssignTrainingByIdUseCase } from "../../domain/usecases/training/assignTrainingById";
import { CreateTrainingUseCase } from "../../domain/usecases/training/createTraining";
import { GetTrainingUseCase } from "../../domain/usecases/training/getTraining";
import { GetTrainingsByTeamUseCase } from "../../domain/usecases/training/getTrainingsByTeam";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { AthleteTrainingRepo } from "../../infra/postgres/repo/AthleteTrainingRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { TrainingRepo } from "../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../main/presentation/httpHelper";

class TrainingController {
  async createTraining(req: Request) {
    const { id } = req.params;

    const createTrainingUseCase = new CreateTrainingUseCase(
      new TrainingRepo(),
      new TeamRepo(),
      new AthleteTrainingRepo()
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

    const assignTrainingById = new AssignTrainingByIdUseCase(
      new TrainingRepo(),
      new AthleteRepo(),
      new AthleteTrainingRepo()
    );
    return await assignTrainingById.execute(Number(id), athletes);
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
