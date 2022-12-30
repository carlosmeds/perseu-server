import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetTeamUseCase {
  constructor(private teamRepo: TeamRepo) {}

  async execute(id: number) {
    const team = await this.teamRepo.getTeam(id);
    if (!team) {
      return notFound("Time não encontrado");
    }

    return success(team);
  }
}
