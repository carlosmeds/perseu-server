import { Request } from "express";
import { CreateGroupUseCase } from "../../domain/usecases/group/createGroup";
import { GetGroupsByAthleteUseCase } from "../../domain/usecases/group/getGroupsByAthlete";
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
}

export const groupController = new GroupController();
