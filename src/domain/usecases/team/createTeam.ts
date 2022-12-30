import { Code } from "../../../app/service/code.service";
import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class CreateTeamUseCase {
  constructor(private teamRepo: TeamRepo, private coachRepo: CoachRepo) {}
  async execute(id: number, name: string) {
    const code = Code.generate();

    const coach = await this.coachRepo.getCoach(id);
    if (!coach) {
      return notFound("Treinador não encontrado");
    }

    const team = await this.teamRepo.createTeam(coach, name, code);

    return success(team);
  }
}
