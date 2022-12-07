import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Athlete } from "../schema/Athlete.schema";
import { AthleteTraining } from "../schema/AthleteTraining.schema";
import { CheckIn } from "../schema/CheckIn.schema";
import { Training } from "../schema/Training.schema";
import { athleteTrainingsToSeed } from "./input/athleteTraining";

export class AthleteTrainingSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    for (const athleteTrainingToSeed of athleteTrainingsToSeed) {
      const athleteTraining = new AthleteTraining();

      const athlete = await dataSource.manager.findOneBy(Athlete, {
        id: athleteTrainingToSeed.athleteId,
      });
      const training = await dataSource.manager.findOneBy(Training, {
        id: athleteTrainingToSeed.trainingId,
      });

      athleteTraining.active = athleteTrainingToSeed.active;
      athleteTraining.athlete = athlete!;
      athleteTraining.training = training!;

      const checkIns = athleteTrainingToSeed.checkIn
      if (checkIns.length) {
        athleteTraining.lastCheckIn = checkIns[0].date;

        for (const checkIn of checkIns) {
          const checkInEntity = new CheckIn();
          checkInEntity.effort = checkIn.effort;
          checkInEntity.date = checkIn.date;
          checkInEntity.training = training!;
          checkInEntity.athlete = athlete!;

          await dataSource.manager.save(checkInEntity);
        }
      }

      await dataSource.manager.save(athleteTraining);
    }
  }
}
