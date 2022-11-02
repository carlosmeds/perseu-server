import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Exercise } from "../schema/Exercise.schema";
import { Session } from "../schema/Session.schema";
import { Team } from "../schema/Team.schema";
import { Training } from "../schema/Training.schema";

export class TrainingRepo {
  async createTraining(team: Team, name: string, athletes: any, sessions: any) {
    const result = await AppDataSource.transaction(
      async (transactionalEntityManager) => {
        const sessionsSaved = await Promise.all(
          sessions.map(async (session: any) => {
            const exercises = await Promise.all(
              session.exercises.map(async (exercise: any) => {
                const { name, description } = exercise;
                const exerciseSave = new Exercise();
                exerciseSave.name = name;
                exerciseSave.description = description;

                return await transactionalEntityManager.save(exerciseSave);
              })
            );
            const sessionSave = new Session();
            sessionSave.name = session.name;
            sessionSave.exercises = exercises;

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
        training.name = name;
        training.team = team;
        training.athletes = athletesSaved;
        training.sessions = sessionsSaved;

        return await transactionalEntityManager.save(training);
      }
    );

    return result;
  }

  async getTrainingById(id: number) {
    const result = await AppDataSource.manager.findOne(Training, {
      relations: ["sessions", "sessions.exercises", "athletes"],
      where: { id },
    });

    return result;
  }

  async getTrainingByAthlete(athlete: Athlete) {
    const result = await AppDataSource.manager.find(Training, {
      relations: ["sessions", "sessions.exercises"],
      where: { athletes: athlete },
      order: { createdAt: "DESC" },
    });

    return result[0];
  }

  async getTrainingsByTeam(team: Team) {
    const result = await AppDataSource.manager.find(Training, {
      relations: ["sessions", "sessions.exercises"],
      where: { team: team },
      order: { createdAt: "DESC" },
    });

    return result.map((training) => {
      return {
        id: training.id,
        name: training.name,
      };
    });
  }

  async assignTrainingById(athletes: Athlete[], training: Training) {
    training.athletes = [...training.athletes, ...athletes];

    return await AppDataSource.manager.save(training);
  }

  async countTrainingByTeam(team: Team) {
    return await AppDataSource.manager.count(Training, {
      where: { team },
    });
  }
}
