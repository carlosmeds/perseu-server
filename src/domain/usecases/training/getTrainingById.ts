import { TrainingRepo } from "../../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetTrainingByIdUseCase {
  constructor(private trainingRepo: TrainingRepo) {}

  async execute(id: number): Promise<any> {
    const training = await this.trainingRepo.getTrainingById(id);
    if (!training) {
      return notFound("Treino não encontrado");
    }

    return success(training);
  }
}
