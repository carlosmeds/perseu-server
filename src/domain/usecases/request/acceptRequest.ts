import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { RequestRepo } from "../../../infra/postgres/repo/RequestRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";
import { RequestStatus } from "../../enum/RequestStatus";

export class AcceptRequestUseCase {
  constructor(
    private athleteRepo: AthleteRepo,
    private requestRepo: RequestRepo
  ) {}
  async execute(id: number) {
    const athlete = await this.athleteRepo.getAthlete(id);
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const request = await this.requestRepo.getRequestByAthlete(athlete);
    if (!request) {
      return notFound("Solicitação não encontrada");
    }

    await this.requestRepo.updateRequestStatus(
      athlete,
      request,
      RequestStatus.ACCEPTED
    );

    await this.athleteRepo.updateAthleteTeam(athlete, request.team);

    return success({ message: "Solicitação aceita" });
  }
}
