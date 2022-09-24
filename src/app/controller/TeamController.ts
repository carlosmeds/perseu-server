import { Request, Response } from "express";
import { RequestRepo } from "../../infra/postgres/repo/RequestRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { Code } from "../service/code.service";

class TeamController {
  async createTeam(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const teamRepo = new TeamRepo();
    const code = Code.generate()
    const team = await teamRepo.createTeam(Number(id), name, code);
    if (!team) {
      return res.status(400).json({
        message: "Falha ao criar equipe",
      });
    }

    return res.json(team);
  }

  async getTeam(req: Request, res: Response) {
    const { id } = req.params;
    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeam(Number(id));
    if (!team) {
      return res.status(400).json({
        message: "Falha ao buscar equipe",
      });
    }

    return res.json(team);
  }

  async getAthletesByTeam(req: Request, res: Response) {
    const { id } = req.params;
    const teamRepo = new TeamRepo();
    const athletes = await teamRepo.getAthletesByTeam(Number(id));
    if (!athletes) {
      return res.status(400).json({
        message: "Falha ao buscar atletas",
      });
    }

    return res.json(athletes);
  }
}
export const teamController = new TeamController();
