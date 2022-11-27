import { UserStatus } from "../../../domain/enum/UserStatus";
import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Team } from "../schema/Team.schema";
import { User } from "../schema/User.schema";

export class AthleteRepo {
  async getAthlete(id: number) {
    const result = await AppDataSource.manager.findOneBy(Athlete, { id });

    return result;
  }

  async updateAthlete(
    athlete: Athlete,
    name: string,
    document: string,
    birthdate: Date,
    height: number,
    weight: number
  ) {
    athlete.name = name;
    athlete.document = document;
    athlete.birthdate = new Date(birthdate);
    athlete.height = height;
    athlete.weight = weight;
    athlete.updatedAt = new Date();
    return AppDataSource.manager.save(athlete);
  }

  async updateAthleteTeam(athlete: Athlete, team: Team) {
    athlete.team = team;
    athlete.updatedAt = new Date();
    await AppDataSource.manager.save(athlete);
  }

  async createAthlete(
    name: string,
    document: string,
    birthdate: Date,
    height: number,
    weight: number,
    user: User
  ) {
    const athlete = new Athlete();
    athlete.name = name;
    athlete.document = document;
    athlete.birthdate = new Date(birthdate);
    athlete.user = user;
    athlete.height = height;
    athlete.weight = weight;

    await AppDataSource.manager.save(athlete);
    return athlete;
  }

  async getAthleteAndTeamByUserId(userId: number) {
    const [result] = await AppDataSource.manager.find(Athlete, {
      relations: ["team"],
      where: { user: { id: userId } },
    });

    if (result.team) {
      return {
        athlete: {
          id: result.id,
          name: result.name,
        },
        status: result.status,
        team: {
          id: result.team.id,
          name: result.team.name,
        },
      };
    }

    return {
      athlete: {
        id: result.id,
        name: result.name,
      },
      status: result.status,
    };
  }

  async updateAthleteStatus(athlete: Athlete, status: UserStatus) {
    athlete.status = status;
    athlete.updatedAt = new Date();
    await AppDataSource.manager.save(athlete);
  }

  async countAthletesByTeam(team: Team) {
    return await AppDataSource.manager.count(Athlete, {
      where: { team },
    });
  }

  async countAthletes() {
    return await AppDataSource.manager.count(Athlete);
  }
}
