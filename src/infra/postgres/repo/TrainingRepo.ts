import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Exercise } from "../schema/Exercise.schema";
import { Session } from "../schema/Session.schema";
import { Training } from "../schema/Training.schema";

export class TrainingRepo {
  async createTraining(athletes: any, sessions: any) {
    const result = await AppDataSource.transaction(async (transactionalEntityManager) => {
      const sessionsSaved = await Promise.all(
        sessions.map(async (session: any) => {
          const exercises = await Promise.all(
            session.exercises.map(async (exercise: any) => {
              const { name, description } = exercise;
              const exerciseSave = new Exercise();
              exerciseSave.name = name;
              exerciseSave.description = description;
              exerciseSave.createdAt = new Date();
              exerciseSave.updatedAt = new Date();
              return await transactionalEntityManager.save(
                exerciseSave
              );
            })
          );
          const sessionSave = new Session();
          sessionSave.name = session.name;
          sessionSave.exercises = exercises;
          sessionSave.createdAt = new Date();
          sessionSave.updatedAt = new Date();
          return await transactionalEntityManager.save(sessionSave);
        })
      );

      const athletesSaved = await Promise.all(
        athletes.map(async (id: any) => {
          const result = await transactionalEntityManager.findOneBy(Athlete, {
            id: id,
          });
          return result;
        })
      );
      const training = new Training();

      training.athletes = athletesSaved;
      training.sessions = sessionsSaved;
      training.sessions = sessionsSaved;
      training.createdAt = new Date();
      training.updatedAt = new Date();
      await transactionalEntityManager.save(training);
      return training;
    });

    return result
  }
}
