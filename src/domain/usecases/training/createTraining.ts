import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { TrainingRepo } from "../../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class CreateTrainingUseCase {
  constructor(private trainingRepo: TrainingRepo, private teamRepo: TeamRepo) {}

  async execute(id: number, data: any): Promise<any> {
    const { name, athletes, sessions } = data;

    const team = await this.teamRepo.getTeam(Number(id));
    if (!team) {
      return notFound("Time não encontrado");
    }

    const training = await this.trainingRepo.createTraining(
      team,
      name,
      athletes,
      sessions
    );

    return success(training);
  }
}
