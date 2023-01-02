import { SendNotificationRepo } from "../../infra/firebase/repo/SendNotificationRepo";
import { NotificationRepo } from "../../infra/postgres/repo/NotificationRepo";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";

export type NotificationText = {
  title: string;
  body: string;
};

export class NotificationService {
  static async send(userId: number, notification: NotificationText) {
    const userRepo = new UserRepo();
    const notificationRepo = new NotificationRepo();
    const sendNotificationRepo = new SendNotificationRepo();

    const user = await userRepo.getUserById(userId);
    if (!user) return;

    const token = await notificationRepo.getToken(user);
    if (!token) return;

    sendNotificationRepo.send(notification.title, notification.body, token);
  }
}
