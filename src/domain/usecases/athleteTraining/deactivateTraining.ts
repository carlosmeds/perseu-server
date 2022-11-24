import { AthleteTrainingRepo } from "../../../infra/postgres/repo/AthleteTrainingRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class DeactivateTrainingUseCase {
  constructor(private athleteTrainingRepo: AthleteTrainingRepo) {}

  async execute(athleteId: number, trainingId: number): Promise<any> {
    const athleteTraining = await this.athleteTrainingRepo.getAthleteTraining(
      Number(athleteId),
      Number(trainingId)
    );
    if (!athleteTraining) {
      return notFound("Atleta não está vinculado ao treino");
    }

    await this.athleteTrainingRepo.deactivateTraining(athleteTraining);

    return success({ message: "Treino desativado com sucesso" });
  }
}
