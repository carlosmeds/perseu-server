import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { success } from "../../../main/presentation/httpHelper";

export class GetAdminsUseCase {
  constructor(private userRepo: UserRepo) {}

  async execute(): Promise<any> {
    const admins = await this.userRepo.getAdmins();
    const result = admins.map((admin) => {
      return {
        id: admin.id,
        email: admin.email,
        createdAt: admin.createdAt,
      };
    });

    return success(result);
  }
}
