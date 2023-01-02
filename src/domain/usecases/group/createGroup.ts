import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { GroupRepo } from "../../../infra/postgres/repo/GroupRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { Athlete } from "../../../infra/postgres/schema/Athlete.schema";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class CreateGroupUseCase {
  constructor(
    private teamRepo: TeamRepo,
    private groupRepo: GroupRepo,
    private athleteRepo: AthleteRepo
  ) {}

  async execute(id: number, name: string, athletesId: any): Promise<any> {
    const team = await this.teamRepo.getTeam(id);

    if (!team) {
      return notFound("Time não encontrado");
    }

    const promise = athletesId
      .map(async (athleteId: string) => {
        return await this.athleteRepo.getAthlete(Number(athleteId));
      })
      .filter((athlete: Athlete) => athlete);
    const athletes = await Promise.all(promise);

    const group = await this.groupRepo.createGroup(name, team, athletes);

    return success(group);
  }
}
