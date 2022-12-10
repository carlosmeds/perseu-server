import { GroupRepo } from "../../../infra/postgres/repo/GroupRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetGroupsByTeamUseCase {
  constructor(private groupRepo: GroupRepo, private teamRepo: TeamRepo) {}

  async execute(id: number): Promise<any> {
    const team = await this.teamRepo.getTeam(id);

    if (!team) {
      return notFound("Time não encontrado");
    }

    const groups = await this.groupRepo.getGroupsByTeam(team);

    return success(groups);
  }
}
