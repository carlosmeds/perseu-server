import { Request } from "express";
import { CreateGroupUseCase } from "../../domain/usecases/group/createGroup";
import { GetGroupsByAthleteUseCase } from "../../domain/usecases/group/getGroupsByAthlete";
import { GetGroupsByTeamUseCase } from "../../domain/usecases/group/getGroupsByTeam";
import { GetGroupByIdUseCase } from "../../domain/usecases/group/getGroupDetails";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { GroupRepo } from "../../infra/postgres/repo/GroupRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";

class GroupController {
  async createGroup(req: Request) {
    const { id } = req.params;
    const { athletes, name } = req.body;

    const createGroupUseCase = new CreateGroupUseCase(
      new TeamRepo(),
      new GroupRepo(),
      new AthleteRepo()
    );
    return await createGroupUseCase.execute(Number(id), name, athletes);
  }

  async getGroupsByAthlete(req: Request) {
    const { id } = req.params;

    const groupRepo = new GroupRepo();
    const athleteRepo = new AthleteRepo();

    const getGroupsByAthleteUseCase = new GetGroupsByAthleteUseCase(
      groupRepo,
      athleteRepo
    );
    return await getGroupsByAthleteUseCase.execute(Number(id));
  }

  async getGroupsByTeam(req: Request) {
    const { id } = req.params;

    const groupRepo = new GroupRepo();
    const teamRepo = new TeamRepo();

    const getGroupsByTeamUseCase = new GetGroupsByTeamUseCase(
      groupRepo,
      teamRepo
    );
    return await getGroupsByTeamUseCase.execute(Number(id));
  }

  async getGroupById(req: Request) {
    const { id } = req.params;

    const groupRepo = new GroupRepo();

    const getGroupByIdUseCase = new GetGroupByIdUseCase(groupRepo);
    return await getGroupByIdUseCase.execute(Number(id));
  }
}

export const groupController = new GroupController();
