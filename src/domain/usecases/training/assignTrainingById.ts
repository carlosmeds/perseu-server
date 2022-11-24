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
      athletes.map(async (id: string) => {
        const result = await this.athleteRepo.getAthlete(Number(id));
        if (result) {
          await this.athleteTrainingRepo.assignTrainingById([result], training);
        }
      })
    );


    return success({ message: "Treino atribuído com sucesso" });
  }
}
