import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetCoachUseCase {
  constructor(private coachRepo: CoachRepo) {}

  async execute(id: number): Promise<any> {
    const coach = await this.coachRepo.getCoach(id);
    if (!coach) {
      return notFound("Treinador não encontrado");
    }

    return success(coach);
  }
}
