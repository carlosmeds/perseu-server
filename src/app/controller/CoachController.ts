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

  async updateCoach(req: Request, res: Response) {
    const { id } = req.params;
    const { name, document, birthdate, cref } = req.body;
    const coachRepo = new CoachRepo();
    const coach = await coachRepo.getCoach(Number(id));
    if (!coach) {
      return res.status(404).json({
        message: "Treinador não encontrado",
      });
    }

    const newCoach = await coachRepo.updateCoach(
      coach,
      name,
      document,
      birthdate,
      cref
    );

    return res.json(newCoach);
  }
}

export const coachController = new CoachController();
