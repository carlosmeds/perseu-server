import { AppDataSource } from "../data-source";
import { User } from "../schema/User.schema";

export class UserRepo {
  async getUser(email: string) {
    const result = await AppDataSource.manager.findOneBy(User, { email });

    return result;
  }
}
