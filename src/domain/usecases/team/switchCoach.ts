import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { notFound, successMessage } from "../../../main/presentation/httpHelper";
import { UserStatus } from "../../enum/UserStatus";

export class SwitchCoachUseCase {
  constructor(
    private teamRepo: TeamRepo,
    private coachRepo: CoachRepo,
  ) {}
  async execute(teamId: number, newCoachId: number) {
    const team = await this.teamRepo.getTeam(teamId);
    if (!team) {
      return notFound("Time não encontrado");
    }
    
    const oldCoach = team.coach;
    const newCoach = await this.coachRepo.getCoach(newCoachId);
    if (!newCoach) {
      return notFound("Treinador não encontrado");
    }
    if (newCoach.status !== UserStatus.COACH_WITHOUT_TEAM) {
      return notFound("Treinador já está em um time");
    }

    await this.teamRepo.updateTeamCoach(team, newCoach)

    await this.coachRepo.updateCoachTeam(newCoach, team);
    await this.coachRepo.removeCoachTeam(oldCoach);

    return successMessage("Treinador trocado com sucesso");
  }
}
