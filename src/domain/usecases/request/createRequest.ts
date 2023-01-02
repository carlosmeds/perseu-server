import { NotificationService } from "../../../app/service/notification.service";
import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { RequestRepo } from "../../../infra/postgres/repo/RequestRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import {
  badRequest,
  notFound,
  successMessage,
} from "../../../main/presentation/httpHelper";

export class CreateRequestUseCase {
  constructor(
    private athleteRepo: AthleteRepo,
    private teamRepo: TeamRepo,
    private requestRepo: RequestRepo,
    private coachRepo: CoachRepo
  ) {}
  async execute(id: number, code: string) {
    const athlete = await this.athleteRepo.getAthlete(id);
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    if (athlete.team) {
      return badRequest("Atleta já está em um time");
    }

    const team = await this.teamRepo.getTeamByCode(code.toUpperCase());
    if (!team) {
      return notFound("Time não encontrado por código");
    }

    await this.requestRepo.createRequest(athlete, team);

    const coach = await this.coachRepo.getCoach(team.coach.id);
    await NotificationService.send(coach!.user.id, {
      title: "Solicitação de atleta",
      body: `${athlete.name} solicitou para entrar no seu time`,
    });

    return successMessage("Solicitação enviada");
  }
}
