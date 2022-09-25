import { Request, Response } from "express";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { TrainingRepo } from "../../infra/postgres/repo/TrainingRepo";

class TrainingController {
  async createTraining(req: Request, res: Response) {
    const { athletes, sessions } = req.body;
    const repo =  new TrainingRepo()
    const training = await repo.createTraining(athletes, sessions);

    return res.json(training);
  }

  async getTrainingByAthlete(req: Request, res: Response) {
    const { id } = req.params;

    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    const repo =  new TrainingRepo()
    const training = await repo.getTrainingByAthlete(athlete);

    return res.json(training);
  }
}
export const trainingController = new TrainingController();
