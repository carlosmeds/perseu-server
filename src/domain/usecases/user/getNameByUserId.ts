import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";
import { UserType } from "../../enum/UserType";

export class GetNameByUserIdUseCase {
  constructor(
    private userRepo: UserRepo,
    private athleteRepo: AthleteRepo,
    private coachRepo: CoachRepo
  ) {}

  async execute(id: number): Promise<any> {
    const user = await this.userRepo.getUserById(id);
    if (!user) {
      return notFound("Usuário não encontrado");
    }

    if (user.type === UserType.ATHLETE) {
      const result = await this.athleteRepo.getAthleteAndTeamByUserId(user.id);
      if (!result) {
        return notFound("Atleta não encontrado");
      }

      return success({ name: result.athlete.name });
    } else {
      const result = await this.coachRepo.getCoachAndTeamByUserId(user.id);
      if (!result) {
        return notFound("Treinador não encontrado");
      }

      return success({ name: result.coach.name });
    }
  }
}
