import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Coach } from "../schema/Coach.schema";
import { Team } from "../schema/Team.schema";
import { User } from "../schema/User.schema";

export class TeamRepo {
  async createTeam(coachId: number, name: string) {
    const team = new Team();
    team.name = name;
    team.code = "T1";
    const coach = await AppDataSource.manager.findOneBy(Coach, { id: coachId });
    if (!coach) {
      throw new Error("Coach not found");
    }
    team.coach = coach
    team.createdAt = new Date();
    team.updatedAt = new Date();
    await AppDataSource.manager.save(team);
    return team;
  }

  async createAthlete(
    name: string,
    document: string,
    birthdate: Date,
    user: User
  ) {
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
