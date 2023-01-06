import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { success } from "../../../main/presentation/httpHelper";

export class GetCoachesWithoutTeamUseCase {
  constructor(private coachRepo: CoachRepo) {}

  async execute(): Promise<any> {
    const coaches = await this.coachRepo.getCoachesWithoutTeam();

    return success(coaches);
  }
}
