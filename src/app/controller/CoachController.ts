import { Request } from "express";
import { GetCoachUseCase } from "../../domain/usecases/coach/getCoach";
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
}

export const coachController = new CoachController();
