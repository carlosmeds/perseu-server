import { Request } from "express";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";
import {
  badRequest,
  notFound,
  success,
} from "../../main/presentation/httpHelper";
import { CryptoService } from "../service/crypto.service";
import { Pagination } from "../service/pagination.service";

class UserController {
  async updatePassword(req: Request) {
    const { id } = req.params;
    const { newPassword, oldPassword } = req.body;
    const userRepo = new UserRepo();
    const user = await userRepo.getUserById(Number(id));
    if (!user) {
      return notFound("Usuário não encontrado");
    }
    const isPasswordCorrect = await CryptoService.compare(
      oldPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return badRequest("Senha inválida");
    }

    const hashedPassword = await CryptoService.hash(newPassword);
    await userRepo.updateUserPassword(user, hashedPassword);

    return success("Senha atualizada com sucesso");
  }

  async getAdmins() {
    const userRepo = new UserRepo();
    const admins = await userRepo.getAdmins();
    const result = admins.map((admin) => {
      return {
        id: admin.id,
        email: admin.email,
        createdAt: admin.createdAt,
      };
    });

    return success(result);
  }

  async getCoaches(req: Request) {
    const pages = Pagination.paginate(req.query);

    const userRepo = new UserRepo();
    const [coaches, total] = await userRepo.getCoaches(
      pages.skip,
      pages.pageSize,
      pages.search
    );

    const result = coaches.map((coach) => {
      return {
        id: coach.id,
        name: coach.name,
        email: coach.user.email,
        team: coach?.team?.name ?? null,
        createdAt: coach.createdAt,
      };
    });

    return success({
      athletes: result,
      count: total,
      page: pages.page,
      pageSize: pages.pageSize,
    });
  }

  async getAthletes(req: Request) {
    const pages = Pagination.paginate(req.query);

    const userRepo = new UserRepo();
    const [athletes, total] = await userRepo.getAthletes(
      pages.skip,
      pages.pageSize,
      pages.search
    );

    const result = athletes.map((athlete) => {
      return {
        id: athlete.id,
        name: athlete.name,
        email: athlete.user.email,
        team: athlete?.team?.name ?? null,
        createdAt: athlete.createdAt,
      };
    });

    return success({
      athletes: result,
      count: total,
      page: pages.page,
      pageSize: pages.pageSize,
    });
  }
}

export const userController = new UserController();
