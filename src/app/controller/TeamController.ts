import { Request } from "express";
import { GetTeamDetailsUseCase } from "../../domain/usecases/team/getTeamDetails";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { TrainingRepo } from "../../infra/postgres/repo/TrainingRepo";
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

  async updateTeamName(req: Request) {
    const { id } = req.params;
    const { name } = req.body;
    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeam(Number(id));
    if (!team) {
      return notFound("Time não encontrado");
    }
    const result = await teamRepo.updateTeamName(team, name);

    return success(result);
  }

  async getAllTeams() {
    const teamRepo = new TeamRepo();
    const teams = await teamRepo.getAllTeams();

    return success(teams);
  }

  async getTeamDetails(req: Request) {
    const { id } = req.params;
    const teamRepo = new TeamRepo();
    const trainingRepo = new TrainingRepo();
    const athleteRepo = new AthleteRepo();

    const getTeamDetailsUseCase = new GetTeamDetailsUseCase(
      teamRepo,
      trainingRepo,
      athleteRepo
    );
    return await getTeamDetailsUseCase.execute(Number(id));
  }
}

export const teamController = new TeamController();
