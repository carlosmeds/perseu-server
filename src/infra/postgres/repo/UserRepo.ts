import { AppDataSource } from "../data-source";
import { User } from "../schema/User.schema";

export class UserRepo {
  async getUser(email: string) {
    const result = await AppDataSource.manager.findOneBy(User, { email });

    return result;
  }

  async createUser(email: string, password: string) {
    const user = new User();
    user.email = email;
    user.password = password;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    await AppDataSource.manager.save(user);
    return user;
  }
}
