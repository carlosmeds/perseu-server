import { CryptoService } from "../../../app/service/crypto.service";
import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { forbidden, success } from "../../../main/presentation/httpHelper";
import { UserType } from "../../enum/UserType";

export class RegisterAdminUseCase {
  constructor(private userRepo: UserRepo) {}
  async execute(data: any) {
    const { email, password } = data;
    const hashedPassword = await CryptoService.hash(password);

    const userByEmail = await this.userRepo.getUserByEmail(email);
    if (userByEmail) {
      return forbidden("Email já está em uso");
    }
    const user = await this.userRepo.createUser(
      email,
      hashedPassword,
      UserType.ADMIN
    );

    return success({ id: user.id });
  }
}
