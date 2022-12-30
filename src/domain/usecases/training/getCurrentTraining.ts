import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { TrainingRepo } from "../../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetCurrentTrainingUseCase {
  constructor(private repo: TrainingRepo, private athleteRepo: AthleteRepo) {}

  async execute(id: number): Promise<any> {
    const athlete = await this.athleteRepo.getAthlete(id);
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const trainings = await this.repo.getTrainingsByAthlete(athlete);

    if (!trainings.length) {
      return notFound("Nenhum treino atribuído");
    }

    const orderedTrainings = trainings.sort((a, b) => {
      if (a.lastCheckIn < b.lastCheckIn) {
        return -1;
      }
      if (a.lastCheckIn == b.lastCheckIn) {
        if (a.createdAt <= b.createdAt) {
          return -1;
        } else {
          return 1;
        }
      }

      return 1;
    });

    return success(orderedTrainings[0].training);
  }
}
