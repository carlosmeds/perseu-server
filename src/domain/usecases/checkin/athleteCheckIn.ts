import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { CheckInRepo } from "../../../infra/postgres/repo/CheckInRepo";
import { TrainingRepo } from "../../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class AthleteCheckInUseCase {
  constructor(
    private trainingRepo: TrainingRepo,
    private athleteRepo: AthleteRepo,
    private checkInRepo: CheckInRepo
  ) {}

  async execute(
    id: number,
    athleteId: number,
    effort: number,
    date: Date
  ): Promise<any> {
    const athlete = await this.athleteRepo.getAthlete(Number(athleteId));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const training = await this.trainingRepo.getTrainingById(Number(id));
    if (!training) {
      return notFound("Treino não encontrado");
    }

    const checkIn = await this.checkInRepo.athleteCheckIn(
      training,
      athlete,
      effort,
      date
    );

    return success(checkIn);
  }
}
