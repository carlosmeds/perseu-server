import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { AthleteTrainingRepo } from "../../../infra/postgres/repo/AthleteTrainingRepo";
import { TrainingRepo } from "../../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class AssignTrainingByIdUseCase {
  constructor(
    private trainingRepo: TrainingRepo,
    private athleteRepo: AthleteRepo,
    private athleteTrainingRepo: AthleteTrainingRepo
  ) {}

  async execute(id: number, athletes: string[]): Promise<any> {
    const training = await this.trainingRepo.getTrainingById(Number(id));
    if (!training) {
      return notFound("Treino não encontrado");
    }

    await Promise.all(
      athletes.map(async (athleteId: string) => {
        const athlete = await this.athleteRepo.getAthlete(Number(athleteId));

        const athleteTraining =
          await this.athleteTrainingRepo.getAthleteTraining(
            Number(athleteId),
            id
          );
        if (athleteTraining) return;

        if (athlete) {
          await this.athleteTrainingRepo.assignTrainingById(
            [athlete],
            training
          );
        }
      })
    );

    return success({ message: "Treino atribuído com sucesso" });
  }
}
