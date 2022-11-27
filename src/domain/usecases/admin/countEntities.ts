import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class CountEntitiesUseCase {
  constructor(
    private athleteRepo: AthleteRepo,
    private coachRepo: CoachRepo,
    private teamRepo: TeamRepo
  ) {}

  async execute(): Promise<any> {
    const athletes = await this.athleteRepo.countAthletes();
    const coaches = await this.coachRepo.countCoaches();
    const teams = await this.teamRepo.countTeams();

    return success({
      coaches,
      athletes,
      teams,
    });
  }
}
