import { CryptoService } from "../../../app/service/crypto.service";
import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import {
  notFound,
  badRequest,
  success,
} from "../../../main/presentation/httpHelper";

export class UpdatePasswordUseCase {
  constructor(private userRepo: UserRepo) {}

  async execute(
    id: number,
    newPassword: string,
    oldPassword: string
  ): Promise<any> {
    const user = await this.userRepo.getUserById(Number(id));
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
    await this.userRepo.updateUserPassword(user, hashedPassword);

    return success({ message: "Senha atualizada com sucesso" });
  }
}
