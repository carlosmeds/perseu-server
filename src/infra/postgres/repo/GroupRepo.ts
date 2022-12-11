import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Group } from "../schema/Group.schema";
import { Team } from "../schema/Team.schema";

export class GroupRepo {
  async createGroup(name: string, team: Team, athletes: Athlete[]) {
    const group = new Group();
    group.name = name;
    group.athletes = athletes;
    group.team = team;

    return await AppDataSource.manager.save(group);
  }

  async getGroupsByAthlete(athlete: Athlete) {
    return await AppDataSource.manager.find(Group, {
      relations: ["athletes"],
      where: { athletes: { id: athlete.id } },
    });
  }

  async getGroupsByTeam(team: Team) {
    return await AppDataSource.manager.find(Group, {
      relations: ["team"],
      where: { team },
    });
  }

  async getGroupById(id: number) {
    return await AppDataSource.manager.findOne(Group, {
      where: { id },
      relations: ["athletes", "athletes.user"],
    });
  }
}
