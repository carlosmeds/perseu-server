import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { CheckIn } from "../schema/CheckIn.schema";
import { Training } from "../schema/Training.schema";

export class CheckInRepo {
  async athleteCheckIn(
    training: Training,
    athlete: Athlete,
    effort: number,
    date: Date
  ) {
    const checkIn = new CheckIn();
    checkIn.training = training;
    checkIn.athlete = athlete;
    checkIn.effort = effort;
    checkIn.date = date;

    checkIn.createdAt = new Date();
    checkIn.updatedAt = new Date();

    return AppDataSource.manager.save(checkIn);
  }

  async getCheckInByAthlete(athlete: Athlete) {
    const result = await AppDataSource.manager.find(CheckIn, {
      relations: ["training"],
      where: { athlete, training: { team: athlete.team } },
    });

    return result;
  }
}
