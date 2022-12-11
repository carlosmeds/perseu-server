import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetAdminByIdUseCase {
  constructor(private userRepo: UserRepo) {}

  async execute(id: number): Promise<any> {
    const user = await this.userRepo.getUserById(id);

    if (!user || user.type !== "ADMIN") {
      return notFound("Admin não encontrado");
    }

    return success({
      id: user.id,
      email: user.email,
      createdAt: user?.createdAt,
    });
  }
}
