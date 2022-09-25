import { Request, Response } from "express";
import { TrainingRepo } from "../../infra/postgres/repo/TrainingRepo";

class TrainingController {
  async createTraining(req: Request, res: Response) {
    const { athletes, sessions } = req.body;
    const repo =  new TrainingRepo()
    const training = await repo.createTraining(athletes, sessions);

    return res.json(training);
  }
}
export const trainingController = new TrainingController();
