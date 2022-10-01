import { Request } from "express";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { notFound, success } from "../../main/presentation/httpHelper";

class CoachController {
  async getCoach(req: Request) {
    const { id } = req.params;
    const coachRepo = new CoachRepo();
    const coach = await coachRepo.getCoach(Number(id));
    if (!coach) {
      return notFound("Treinador não encontrado");
    }

    return success(coach);
  }

  async updateCoach(req: Request) {
    const { id } = req.params;
    const { name, document, birthdate, cref } = req.body;
    const coachRepo = new CoachRepo();
    const coach = await coachRepo.getCoach(Number(id));
    if (!coach) {
      return notFound("Treinador não encontrado");
    }

    const newCoach = await coachRepo.updateCoach(
      coach,
      name,
      document,
      birthdate,
      cref
    );

    return success(newCoach);
  }
}

export const coachController = new CoachController();
