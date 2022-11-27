import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetAthletesByTeamUseCase {
  constructor(private teamRepo: TeamRepo) {}
  async execute(id: number) {
    const team = await this.teamRepo.getTeam(id);
    if (!team) {
      return notFound("Time não encontrado");
    }

    const athletes = await this.teamRepo.getAthletesByTeam(team);

    return success(athletes);
  }
}
