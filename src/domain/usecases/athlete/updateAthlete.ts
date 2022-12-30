import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class UpdateAthleteUseCase {
  constructor(private athleteRepo: AthleteRepo) {}

  async execute(id: number, data: any): Promise<any> {
    const { name, document, birthdate, height, weight } = data;

    const athlete = await this.athleteRepo.getAthlete(id);
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const newAthlete = await this.athleteRepo.updateAthlete(
      athlete,
      name,
      document,
      birthdate,
      height,
      weight
    );

    return success(newAthlete);
  }
}
