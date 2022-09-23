import { Request, Response } from "express";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";

class CoachController {
  async getCoach(req: Request, res: Response) {
    const { id } = req.params;
    const coachRepo = new CoachRepo();
    const coach = await coachRepo.getCoach(Number(id));
    if (!coach) {
      return res.status(404).json({
        message: "Treinador não encontrado",
      });
    }

    return res.json(coach);
  }
}
export const coachController = new CoachController();
