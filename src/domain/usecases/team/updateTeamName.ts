import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class UpdateTeamNameUseCase {
  constructor(private teamRepo: TeamRepo) {}

  async execute(id: number, name: string) {
    const team = await this.teamRepo.getTeam(id);
    if (!team) {
      return notFound("Time não encontrado");
    }
    const result = await this.teamRepo.updateTeamName(team, name);

    return success(result);
  }
}
