import { Request } from "express";
import { SaveTokenUseCase } from "../../domain/usecases/notification/saveToken";
import { NotificationRepo } from "../../infra/postgres/repo/NotificationRepo";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";

class NotificationController {
  async saveToken(req: Request) {
    const { id } = req.params;
    const { token } = req.body;
    const userRepo = new UserRepo();
    const notificationRepo = new NotificationRepo();

    const saveTokenUseCase = new SaveTokenUseCase(userRepo, notificationRepo);
    return await saveTokenUseCase.execute(Number(id), token);
  }
}

export const notificationController = new NotificationController();
