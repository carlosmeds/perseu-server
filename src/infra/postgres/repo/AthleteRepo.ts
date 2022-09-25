import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Team } from "../schema/Team.schema";
import { User } from "../schema/User.schema";

export class AthleteRepo {
  async getAthlete(id: number) {
    const result = await AppDataSource.manager.findOneBy(Athlete, { id });

    return result;
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
    athlete.createdAt = new Date();
    athlete.updatedAt = new Date();
    await AppDataSource.manager.save(athlete);
    return athlete;
  }
}
