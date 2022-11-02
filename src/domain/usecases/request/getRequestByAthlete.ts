import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { RequestRepo } from "../../../infra/postgres/repo/RequestRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetRequestByAthleteUseCase {
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
    if (!request) {
      return notFound("Solicitação não encontradas");
    }

    return success(request);
  }
}
