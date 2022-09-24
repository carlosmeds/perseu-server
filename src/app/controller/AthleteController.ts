import { Request, Response } from "express";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";

class AthleteController {
  async getAthlete(req: Request, res: Response) {
    const { id } = req.params;
    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return res.status(404).json({
        message: "Atleta não encontrado",
      });
    }

    return res.json(athlete);
  }
}
export const athleteController = new AthleteController();
