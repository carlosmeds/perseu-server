import { NotificationRepo } from "../../../infra/postgres/repo/NotificationRepo";
import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { badRequest, successMessage } from "../../../main/presentation/httpHelper";

export class SaveTokenUseCase {
  constructor(
    private userRepo: UserRepo,
    private notificationRepo: NotificationRepo
  ) {}

  async execute(userId: number, token: string): Promise<any> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) return badRequest("Usuário não encontrado");

    await this.notificationRepo.upsertToken(user, token);    

    return successMessage("Token salvo com sucesso");
  }
}
