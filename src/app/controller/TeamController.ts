import { Request, Response } from "express";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";

class TeamController {
  async createTeam(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const teamRepo = new TeamRepo();
    const team = await teamRepo.createTeam(Number(id), name);
    if (!team) {
      return res.status(400).json({
        message: "Falha ao criar equipe",
      });
    }

    return res.json(team);
  }
}
export const teamController = new TeamController();
