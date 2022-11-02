import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { TrainingRepo } from "../../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetTrainingsByTeamUseCase {
  constructor(private trainingRepo: TrainingRepo, private teamRepo: TeamRepo) {}

  async execute(id: number) {
    const team = await this.teamRepo.getTeam(id);
    if (!team) {
      return notFound("Time não encontrado");
    }

    const trainings = await this.trainingRepo.getTrainingsByTeam(team);

    return success(trainings);
  }
}
