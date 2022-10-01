import { Request } from "express";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";
import { badRequest, notFound, success } from "../../main/presentation/httpHelper";
import { CryptoService } from "../service/crypto.service";

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
}
export const userController = new UserController();
