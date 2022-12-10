import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { GroupRepo } from "../../../infra/postgres/repo/GroupRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetGroupsByAthleteUseCase {
  constructor(
    private groupRepo: GroupRepo,
    private athleteRepo: AthleteRepo
  ) {}

  async execute(id: number): Promise<any> {
    const athlete = await this.athleteRepo.getAthlete(id);

    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const groups = await this.groupRepo.getGroupsByAthlete(athlete)

    return success(groups);
  }
}
