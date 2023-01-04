import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { notFound, successMessage } from "../../../main/presentation/httpHelper";

export class DeleteAthleteUseCase {
  constructor(private athleteRepo: AthleteRepo, private userRepo: UserRepo) {}

  async execute(id: number): Promise<any> {
    const athlete = await this.athleteRepo.getAthlete(id);
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    await this.userRepo.deactivateUser(athlete.user);
    await this.athleteRepo.deactivateAthlete(athlete);

    return successMessage("Atleta deletado com sucesso");
  }
}
