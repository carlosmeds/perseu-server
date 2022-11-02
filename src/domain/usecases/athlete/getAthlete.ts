import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetAthleteUseCase {
  constructor(private athleteRepo: AthleteRepo) {}

  async execute(id: number): Promise<any> {
    const athlete = await this.athleteRepo.getAthlete(id);
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    return success(athlete);
  }
}
