import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Coach } from "../schema/Coach.schema";
import { Team } from "../schema/Team.schema";

export class TeamRepo {
  async createTeam(coachId: number, name: string, code: string) {
    const team = new Team();
    team.name = name;
    team.code = code;
    const coach = await AppDataSource.manager.findOneBy(Coach, { id: coachId });
    if (!coach) {
      throw new Error("Coach not found");
    }
    team.coach = coach;
    await AppDataSource.manager.save(team);
    return team;
  }

  async getTeam(id: number) {
    const result = await AppDataSource.manager.findOneBy(Team, { id });

    return result;
  }

  async getTeamByCode(code: string) {
    const result = await AppDataSource.manager.findOneBy(Team, { code: code.toUpperCase() });

    return result;
  }

  async getAthletesByTeam(id: number) {
    const team = await AppDataSource.manager.findOneBy(Team, { id });
    if (!team) {
      throw new Error("Team not found");
    }
    const athletes = await AppDataSource.manager.findBy(Athlete, {
      team,
    });

    return athletes;
  }
}
