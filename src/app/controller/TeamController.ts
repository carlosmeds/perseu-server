import { Request } from "express";
import { CreateTeamUseCase } from "../../domain/usecases/team/createTeam";
import { GetAthletesByTeamUseCase } from "../../domain/usecases/team/getAthletesByTeam";
import { GetTeamDetailsUseCase } from "../../domain/usecases/team/getTeamDetails";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { CoachRepo } from "../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { TrainingRepo } from "../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../main/presentation/httpHelper";

class TeamController {
  async createTeam(req: Request) {
    const { id } = req.params;
    const { name } = req.body;

    const createTeamUseCase = new CreateTeamUseCase(
      new TeamRepo(),
      new CoachRepo()
    );
    return await createTeamUseCase.execute(Number(id), name);
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

    const getAthletesByTeamUseCase = new GetAthletesByTeamUseCase(teamRepo);
    return await getAthletesByTeamUseCase.execute(Number(id));
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
