import { Request, Response } from "express";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { RequestRepo } from "../../infra/postgres/repo/RequestRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";

class AthleteController {
  async createRequest(req: Request, res: Response) {
    const { id } = req.params;
    const { code } = req.body;
    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return res.status(404).json({
        message: "Atleta não encontrado",
      });
    }

    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeamByCode(code);
    if (!team) {
      return res.status(404).json({
        message: "Time não encontrado por código",
      });
    }

    const requestRepo = new RequestRepo();
    await requestRepo.createRequest(athlete, team);

    return res.json({ message: "Request created" });
  }

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
