import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { AthleteTraining } from "../schema/AthleteTraining.schema";
import { Training } from "../schema/Training.schema";

export class AthleteTrainingRepo {
  async assignTrainingById(athletes: Athlete[], training: Training) {
    athletes.map(async (athlete) => {
        const athleteTraining = new AthleteTraining();
        athleteTraining.athlete = athlete;
        athleteTraining.training = training;

        await AppDataSource.manager.save(athleteTraining);
    });
  }
}
