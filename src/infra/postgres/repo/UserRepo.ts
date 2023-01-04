import { IsNull, Like } from "typeorm";
import { UserType } from "../../../domain/enum/UserType";
import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Coach } from "../schema/Coach.schema";
import { Team } from "../schema/Team.schema";
import { User } from "../schema/User.schema";

export class UserRepo {
  async updateUserPassword(user: User, hashedPassword: string) {
    user.password = hashedPassword;
    user.updatedAt = new Date();
    return AppDataSource.manager.save(user);
  }

  async getUserByEmail(email: string) {
    const result = await AppDataSource.manager.findOneBy(User, {
      email,
      deletedAt: IsNull(),
    });

    return result;
  }

  async getUserById(id: number) {
    const result = await AppDataSource.manager.findOne(User, {
      where: { id, deletedAt: IsNull() },
    });

    return result;
  }

  async deactivateUser(user: User) {
    user.deletedAt = new Date();
    return await AppDataSource.manager.save(user);
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
      deletedAt: IsNull(),
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

  async getUsersByTeamId(team: Team) {
    const athletes = await AppDataSource.manager.find(Athlete, {
      where: { team },
      relations: ["user"],
    });

    const result = athletes.map((athlete) => {
      return {
        id: athlete.user.id,
        name: athlete.name,
      };
    });

    return [...result];
  }
}
