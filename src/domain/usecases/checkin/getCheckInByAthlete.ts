import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { CheckInRepo } from "../../../infra/postgres/repo/CheckInRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetCheckInByAthleteUseCase {
  constructor(private athleteRepo: AthleteRepo, private checkInRepo: CheckInRepo) {}

  async execute(id: number): Promise<any> {
    const athlete = await this.athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const checkIn = await this.checkInRepo.getCheckInByAthlete(athlete);

    return success(checkIn);
  }
}
