import { AppDataSource } from "../data-source";
import { User } from "../schema/User.schema";

export class UserRepo {
  updateUserPassword(user: User, hashedPassword: string) {
    user.password = hashedPassword;
    user.updatedAt = new Date();
    return AppDataSource.manager.save(user);
  }

  async getUserByEmail(email: string) {
    const result = await AppDataSource.manager.findOneBy(User, { email });

    return result;
  }

  async getUserById(id: number) {
    const result = await AppDataSource.manager.findOneBy(User, { id });

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
