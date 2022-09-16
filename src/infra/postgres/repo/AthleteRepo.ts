import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";

export class AthleteRepo {
  async getAthlete(id: number) {
    const result = await AppDataSource.manager.findOneBy(Athlete, { id });

    return result;
  }
}
