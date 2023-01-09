import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { RequestRepo } from "../../../infra/postgres/repo/RequestRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { notFound, successMessage } from "../../../main/presentation/httpHelper";

export class DeleteTeamUseCase {
  constructor(
    private teamRepo: TeamRepo,
    private coachRepo: CoachRepo,
    private athleteRepo: AthleteRepo,
    private requestRepo: RequestRepo
  ) {}
  async execute(id: number,) {
    const team = await this.teamRepo.getTeam(Number(id));
    if (!team) {
      return notFound("Time não encontrado");
    }

    const athletes = await this.teamRepo.getAthletesByTeam(team);
    const promise = athletes.map(async (athlete) => {
        await this.athleteRepo.removeAthleteFromTeam(athlete!);
    });
    await Promise.all(promise);

    await this.teamRepo.deleteTeam(team);
 
    await this.coachRepo.removeCoachTeam(team.coach);

    await this.requestRepo.deleteFromTeam(team);

    return successMessage("Time deletado com sucesso");
  }
}
