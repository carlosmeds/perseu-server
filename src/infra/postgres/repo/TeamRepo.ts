import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Coach } from "../schema/Coach.schema";
import { Team } from "../schema/Team.schema";

export class TeamRepo {
  async createTeam(coachId: number, name: string) {
    const team = new Team();
    team.name = name;
    team.code = "T1";
    const coach = await AppDataSource.manager.findOneBy(Coach, { id: coachId });
    if (!coach) {
      throw new Error("Coach not found");
    }
    team.coach = coach;
    team.createdAt = new Date();
    team.updatedAt = new Date();
    await AppDataSource.manager.save(team);
    return team;
  }

  async getTeam(id: number) {
    const result = await AppDataSource.manager.findOneBy(Team, { id });

    return result;
  }
}
