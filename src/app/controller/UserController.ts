import { Request, Response } from "express";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";
import { CryptoService } from "../service/crypto.service";

class UserController {
  async updatePassword(req: Request, res: Response) {
    const { id } = req.params;
    const { newPassword, oldPassword } = req.body;
    const userRepo = new UserRepo();
    const user = await userRepo.getUserById(Number(id));
    if (!user) {
      return res.status(400).json({
        message: "Falha ao buscar usuário",
      });
    }
    const isPasswordCorrect = await CryptoService.compare(
      oldPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Senha inválida",
      });
    }

    const hashedPassword = await CryptoService.hash(newPassword);
    const updatedUser = await userRepo.updateUserPassword(user, hashedPassword);

    if (!updatedUser) {
      return res.status(400).json({
        message: "Falha ao atualizar senha",
      });
    }

    return res.json({ message: "Senha atualizada com sucesso" });
  }
}
export const userController = new UserController();
