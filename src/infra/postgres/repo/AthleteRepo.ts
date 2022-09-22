import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { User } from "../schema/User.schema";

export class AthleteRepo {
  async getAthlete(id: number) {
    const result = await AppDataSource.manager.findOneBy(Athlete, { id });

    return result;
  }

  async createAthlete(name: string, document: string, birthdate: Date, user: User) {
    const athlete = new Athlete();
    athlete.name = name;
    athlete.document = document;
    athlete.birthdate = new Date(birthdate);
    athlete.user = user;
    athlete.createdAt = new Date();
    athlete.updatedAt = new Date();
    await AppDataSource.manager.save(athlete);
    return athlete;
  }
}
