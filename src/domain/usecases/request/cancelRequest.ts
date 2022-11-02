import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { RequestRepo } from "../../../infra/postgres/repo/RequestRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";
import { UserStatus } from "../../enum/UserStatus";

export class CancelRequestUseCase {
  constructor(
    private requestRepo: RequestRepo,
    private athleteRepo: AthleteRepo
  ) {}

  async execute(id: number) {
    const athlete = await this.athleteRepo.getAthlete(id);
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const request = await this.requestRepo.getRequestByAthlete(athlete);
    await this.requestRepo.deleteRequestByAthlete(request);
    await this.athleteRepo.updateAthleteStatus(
      athlete,
      UserStatus.ATHLETE_WITHOUT_TEAM
    );

    return success({ message: "Solicitação cancelada" });
  }
}
