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

  async updateAthlete(req: Request, res: Response) {
    const { id } = req.params;
    const { name, document, birthdate, height, weight } = req.body;
    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return res.status(404).json({
        message: "Atleta não encontrado",
      });
    }

    const newAthlete = await athleteRepo.updateAthlete(
      athlete,
      name,
      document,
      birthdate,
      height,
      weight
    );

    return res.json(newAthlete);
  }
}
export const athleteController = new AthleteController();
