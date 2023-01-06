import { Request } from "express";
import { GetCoachUseCase } from "../../domain/usecases/coach/getCoach";
import { GetCoachesWithoutTeamUseCase } from "../../domain/usecases/coach/getCoachesWithoutTeam";
import { UpdateCoachUseCase } from "../../domain/usecases/coach/updateCoach";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";

class CoachController {
  async getCoach(req: Request) {
    const { id } = req.params;
    const coachRepo = new CoachRepo();

    const getCoachUseCase = new GetCoachUseCase(coachRepo);
    return await getCoachUseCase.execute(Number(id));
  }

  async updateCoach(req: Request) {
    const { id } = req.params;
    const coachRepo = new CoachRepo();

    const getCoachUseCase = new UpdateCoachUseCase(coachRepo);
    return await getCoachUseCase.execute(Number(id), req.body);
  }

  async getCoachesWithoutTeam(req: Request) {
    const coachRepo = new CoachRepo();

    const getCoachWithoutTeamUseCase = new GetCoachesWithoutTeamUseCase(
      coachRepo
    );
    return await getCoachWithoutTeamUseCase.execute();
  }
}

export const coachController = new CoachController();
