import { AthleteTrainingRepo } from "../../../infra/postgres/repo/AthleteTrainingRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { TrainingRepo } from "../../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class CreateTrainingUseCase {
  constructor(private trainingRepo: TrainingRepo, private teamRepo: TeamRepo, private athleteTrainingRepo: AthleteTrainingRepo) {}

  async execute(id: number, data: any): Promise<any> {
    const { name, athletes, sessions } = data;

    const team = await this.teamRepo.getTeam(Number(id));
    if (!team) {
      return notFound("Time não encontrado");
    }

    const training = await this.trainingRepo.createTraining(
      team,
      name,
      sessions
    );

    await this.athleteTrainingRepo.assignTrainingById(athletes, training);

    return success(training);
  }
}
