import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Exercise } from "../schema/Exercise.schema";
import { Session } from "../schema/Session.schema";
import { Team } from "../schema/Team.schema";
import { Training } from "../schema/Training.schema";
import { trainingsToSeed } from "./input/training";

export class TrainingSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    for (const trainingToSeed of trainingsToSeed) {
      const sessionsSaved = await Promise.all(
        trainingToSeed.sessions.map(async (session: any) => {
          const exercises = await Promise.all(
            session.exercises.map(async (exercise: any) => {
              const { name, description } = exercise;
              const exerciseSave = new Exercise();
              exerciseSave.name = name;
              exerciseSave.description = description;

              return await dataSource.manager.save(exerciseSave);
            })
          );
          const sessionSave = new Session();
          sessionSave.name = session.name;
          sessionSave.exercises = exercises;

          return await dataSource.manager.save(sessionSave);
        })
      );

      const team = await dataSource.manager.findOneBy(Team, {
        id: trainingToSeed.teamId,
      });

      const training = new Training();
      training.name = trainingToSeed.name;
      training.sessions = sessionsSaved;
      training.team = team!;

      await dataSource.manager.save(training);
    }
  }
}
