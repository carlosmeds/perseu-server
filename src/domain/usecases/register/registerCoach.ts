import { CryptoService } from "../../../app/service/crypto.service";
import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { forbidden, success } from "../../../main/presentation/httpHelper";
import { UserType } from "../../enum/UserType";

export class RegisterCoachUseCase {
  constructor(private userRepo: UserRepo, private coachRepo: CoachRepo) {}
  async execute(data: any) {
    const { name, document, birthdate, cref, email, password } = data;
    const hashedPassword = await CryptoService.hash(password);

    const userByEmail = await this.userRepo.getUserByEmail(email);
    if (userByEmail) {
      return forbidden("Email já está em uso");
    }
    const user = await this.userRepo.createUser(
      email,
      hashedPassword,
      UserType.COACH
    );

    const coach = await this.coachRepo.createCoach(
      name,
      document,
      cref,
      birthdate,
      user
    );

    return success({
      id: coach.id,
      name: coach.name,
      email: coach.user.email,
      document: coach.document,
      birthdate: coach.birthdate,
      cref: coach.cref,
    });
  }
}
