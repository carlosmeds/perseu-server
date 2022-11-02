import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class UpdateCoachUseCase {
  constructor(private coachRepo: CoachRepo) {}

  async execute(id: number, data: any): Promise<any> {
    const coach = await this.coachRepo.getCoach(id);
    const { name, document, birthdate, cref } = data;

    if (!coach) {
      return notFound("Treinador não encontrado");
    }

    const newCoach = await this.coachRepo.updateCoach(
      coach,
      name,
      document,
      birthdate,
      cref
    );

    return success(newCoach);
  }
}
