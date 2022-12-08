import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Group } from "../schema/Group.schema";
import { Team } from "../schema/Team.schema";

export class GroupRepo {
  async createGroup(
    name: string,
    team: Team,
    athletes: Athlete[]
  ) {
    const group = new Group();
    group.name = name;
    group.athlete = athletes;

    return await AppDataSource.manager.save(group);
  }
}
