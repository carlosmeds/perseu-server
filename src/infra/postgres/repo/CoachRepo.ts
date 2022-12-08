import { AppDataSource } from "../data-source";
import { Coach } from "../schema/Coach.schema";
import { User } from "../schema/User.schema";

export class CoachRepo {
  async getCoach(id: number) {
    const result = await AppDataSource.manager.findOne(Coach, {
      where: { id },
      relations: ["user", "team"],
    });

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
    await AppDataSource.manager.save(coach);
    return coach;
  }

  async updateCoach(
    coach: Coach,
    name: string,
    document: string,
    birthdate: Date,
    cref: string
  ) {
    coach.name = name;
    coach.document = document;
    coach.birthdate = new Date(birthdate);
    coach.cref = cref;
    coach.updatedAt = new Date();
    await AppDataSource.manager.save(coach);
    return coach;
  }

  async getCoachAndTeamByUserId(userId: number) {
    const [result] = await AppDataSource.manager.find(Coach, {
      relations: ["team"],
      where: { user: { id: userId } },
    });

    if (result.team) {
      return {
        coach: {
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
      coach: {
        id: result.id,
        name: result.name,
      },
      status: result.status,
    };
  }

  async countCoaches() {
    const result = await AppDataSource.manager.count(Coach);
    return result;
  }
}
