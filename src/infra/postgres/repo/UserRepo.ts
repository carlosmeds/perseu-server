import { Like } from "typeorm";
import { UserType } from "../../../domain/enum/UserType";
import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Coach } from "../schema/Coach.schema";
import { User } from "../schema/User.schema";

export class UserRepo {
  async updateUserPassword(user: User, hashedPassword: string) {
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

  async createUser(email: string, password: string, userType: UserType) {
    const user = new User();
    user.email = email;
    user.password = password;
    user.type = userType;
    await AppDataSource.manager.save(user);
    return user;
  }

  async getAdmins() {
    const admins = await AppDataSource.manager.findBy(User, {
      type: UserType.ADMIN,
    });

    return admins;
  }

  async getCoaches(page: number, pageSize: number, keyword: string) {
    const result = await AppDataSource.manager.findAndCount(Coach, {
      relations: ["user", "team"],
      where: { name: Like("%" + keyword + "%") },
      take: pageSize,
      skip: page,
      order: { createdAt: "ASC" },
    });

    return result;
  }

  async getAthletes(page: number, pageSize: number, keyword: string) {
    const result = await AppDataSource.manager.findAndCount(Athlete, {
      relations: ["user", "team"],
      where: { name: Like("%" + keyword + "%") },
      take: pageSize,
      skip: page,
      order: { createdAt: "ASC" },
    });

    return result;
  }
}
