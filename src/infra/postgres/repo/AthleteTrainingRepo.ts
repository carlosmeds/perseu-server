import { notFound } from "../../../main/presentation/httpHelper";
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

  async updateLastCheckIn(athlete: Athlete, training: Training) {
    const athleteTraining = await AppDataSource.manager.findOne(
      AthleteTraining,
      {
        where: { athlete, training, active: true },
      }
    );

    if (!athleteTraining) {
      return notFound("Atleta não está vinculado ao treino");
    }
    athleteTraining.lastCheckIn = new Date();
    await AppDataSource.manager.save(athleteTraining);
  }
}
