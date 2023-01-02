import { AppDataSource } from "../data-source";
import { Notification } from "../schema/Notification.schema";
import { User } from "../schema/User.schema";

export class NotificationRepo {
  async upsertToken(user: User, token: string) {
    const notification = new Notification();
    notification.user = user;
    notification.value = token;

    await AppDataSource.manager.upsert(Notification, notification, ["user"]);
  }

  async getToken(user: User) {
    const result = await AppDataSource.manager.findOne(Notification, {
      where: { user },
    });

    return result?.value;
  }
}
