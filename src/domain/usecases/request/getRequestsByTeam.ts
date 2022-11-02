import { RequestRepo } from "../../../infra/postgres/repo/RequestRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetRequestsByTeamUseCase {
  constructor(private requestRepo: RequestRepo, private teamRepo: TeamRepo) {}
  async execute(id: Number) {
    const team = await this.teamRepo.getTeam(Number(id));
    if (!team) {
      return notFound("Time não encontrado");
    }

    const requests = await this.requestRepo.getRequestsByTeam(team);
    if (!requests) {
      return notFound("Solicitações não encontradas");
    }

    return success(requests);
  }
}
