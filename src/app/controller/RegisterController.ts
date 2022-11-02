import { Request } from "express";
import { RegisterAthleteUseCase } from "../../domain/usecases/register/registerAthlete";
import { RegisterCoachUseCase } from "../../domain/usecases/register/registerCoach";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";

class RegisterController {
  async registerAthlete(req: Request) {
    const registerAthleteUseCase = new RegisterAthleteUseCase(
      new UserRepo(),
      new AthleteRepo()
    );
    return await registerAthleteUseCase.execute(req.body);
  }

  async registerCoach(req: Request) {
    const registerCoachUseCase = new RegisterCoachUseCase(
      new UserRepo(),
      new CoachRepo()
    );
    return await registerCoachUseCase.execute(req.body);
  }
}

export const registerController = new RegisterController();
