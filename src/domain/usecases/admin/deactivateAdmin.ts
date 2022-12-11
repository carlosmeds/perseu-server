import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class DeactivateAdminUseCase {
  constructor(private userRepo: UserRepo) {}

  async execute(id: number): Promise<any> {
    const user = await this.userRepo.getUserById(id);

    if (!user || user.type !== "ADMIN") {
      return notFound("Admin não encontrado");
    }

    await this.userRepo.deactivateUser(user);

    return success({ message: "Admin desativado com sucesso" });
  }
}
