import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { TrainingRepo } from "../../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetTrainingUseCase {
  constructor(private repo: TrainingRepo, private athleteRepo: AthleteRepo) {}

  async execute(id: number): Promise<any> {
    const athlete = await this.athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const training = await this.repo.getTrainingByAthlete(athlete);
    if (!training) {
      return notFound("Treino não encontrado");
    }

    return success(training);
  }
}
