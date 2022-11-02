import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { RequestRepo } from "../../../infra/postgres/repo/RequestRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class CreateRequestUseCase {
  constructor(
    private athleteRepo: AthleteRepo,
    private teamRepo: TeamRepo,
    private requestRepo: RequestRepo
  ) {}
  async execute(id: number, code: string) {
    const athlete = await this.athleteRepo.getAthlete(id);
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const team = await this.teamRepo.getTeamByCode(code);
    if (!team) {
      return notFound("Time não encontrado por código");
    }

    await this.requestRepo.createRequest(athlete, team);

    return success({ message: "Solicitação enviada" });
  }
}
