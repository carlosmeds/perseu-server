import { IsNull } from "typeorm";
import { UserStatus } from "../../../domain/enum/UserStatus";
import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Coach } from "../schema/Coach.schema";
import { Team } from "../schema/Team.schema";

export class TeamRepo {
  async createTeam(coach: Coach, name: string, code: string) {
    const team = new Team();
    team.name = name;
    team.code = code;

    delete coach.team;
    team.coach = coach;

    await AppDataSource.manager.save(team);

    coach.updatedAt = new Date();
    coach.status = UserStatus.COACH_WITH_TEAM;
    await AppDataSource.manager.save(coach);

    return team;
  }

  async getTeam(id: number) {
    const result = await AppDataSource.manager.findOne(Team, {
      where: { id },
      relations: ["coach"],
    });

    return result;
  }

  async getTeamByCode(code: string) {
    const result = await AppDataSource.manager.findOne(Team, {
      where: { code },
      relations: ["coach"],
    });

    return result;
  }

  async getAthletesByTeam(team: Team) {
    const athletes = await AppDataSource.manager.find(Athlete, {
      where: { team, deletedAt: IsNull() },
      order: { name: "ASC" },
    });

    return athletes;
  }

  async updateTeamCoach(team: Team, coach: Coach) {
    team.coach = coach;
    team.updatedAt = new Date();
    return await AppDataSource.manager.save(team);
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

  async countTeams() {
    return await AppDataSource.manager.count(Team);
  }
}
