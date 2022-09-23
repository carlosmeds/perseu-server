import { AppDataSource } from "../data-source";
import { Coach } from "../schema/Coach.schema";
import { User } from "../schema/User.schema";

export class CoachRepo {
  async getCoach(id: number) {
    const result = await AppDataSource.manager.findOneBy(Coach, { id });

    return result;
  }

  async createCoach(
    name: string,
    document: string,
    cref: string,
    birthdate: Date,
    user: User
  ) {
    const coach = new Coach();
    coach.name = name;
    coach.document = document;
    coach.birthdate = new Date(birthdate);
    coach.cref = cref;
    coach.user = user;
    coach.createdAt = new Date();
    coach.updatedAt = new Date();
    await AppDataSource.manager.save(coach);
    return coach;
  }
}
