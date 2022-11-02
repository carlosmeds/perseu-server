import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetUsersByTeamUseCase {
  constructor(
    private teamRepo: TeamRepo,
    private userRepo: UserRepo,
    private coachRepo: CoachRepo
  ) {}

  async execute(id: number): Promise<any> {
    const team = await this.teamRepo.getTeam(id);
    if (!team) {
      return notFound("Time não encontrado");
    }

    const users: any = await this.userRepo.getUsersByTeamId(team);

    const coach = await this.coachRepo.getCoach(team.coach.id);

    users.push({ id: coach?.user.id, name: coach?.name });

    return success(users);
  }
}
