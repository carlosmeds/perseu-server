import { UserStatus } from "../../../domain/enum/UserStatus";
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

    coach.updatedAt = new Date();
    coach.status = UserStatus.COACH_WITH_TEAM;
    await AppDataSource.manager.save(coach);
    return team;
  }

  async getTeam(id: number) {
    const result = await AppDataSource.manager.findOne(Team, { where: { id }, relations: ["coach"] });

    return result;
  }

  async getTeamByCode(code: string) {
    const result = await AppDataSource.manager.findOneBy(Team, {
      code: code.toUpperCase(),
    });

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

  async updateTeamName(team: Team, name: string) {
    team.name = name;
    team.updatedAt = new Date();
    return await AppDataSource.manager.save(team);
  }

  async getAllTeams() {
    const teams = await AppDataSource.manager.find(Team, {
      relations: ["coach"],
    });

    return teams.map((team) => {
      return {
        id: team.id,
        name: team.name,
        code: team.code,
        coach: team.coach.name,
      };
    });
  }

  async getTeamDetails(id: number) {
    const team = await AppDataSource.manager.findOneBy(Team, { id });
    if (!team) {
      throw new Error("Team not found");
    }
    return {
      id: team.id,
      name: team.name,
      code: team.code,
      coach: team.coach.name,
    };
  }
}
