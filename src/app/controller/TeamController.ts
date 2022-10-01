import { Request } from "express";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { notFound, success } from "../../main/presentation/httpHelper";
import { Code } from "../service/code.service";

class TeamController {
  async createTeam(req: Request) {
    const { id } = req.params;
    const { name } = req.body;
    const teamRepo = new TeamRepo();
    const code = Code.generate();
    const team = await teamRepo.createTeam(Number(id), name, code);

    return success(team);
  }

  async getTeam(req: Request) {
    const { id } = req.params;
    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeam(Number(id));
    if (!team) {
      return notFound("Time não encontrado");
    }

    return success(team);
  }

  async getAthletesByTeam(req: Request) {
    const { id } = req.params;
    const teamRepo = new TeamRepo();
    const athletes = await teamRepo.getAthletesByTeam(Number(id));

    return success(athletes);
  }
}
export const teamController = new TeamController();
