import { CryptoService } from "../../../app/service/crypto.service";
import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { forbidden, success } from "../../../main/presentation/httpHelper";
import { UserType } from "../../enum/UserType";

export class RegisterAthleteUseCase {
  constructor(private userRepo: UserRepo, private athleteRepo: AthleteRepo) {}
  async execute(data: any) {
    const { name, document, birthdate, height, weight, email, password } = data;
    const hashedPassword = await CryptoService.hash(password);

    const userByEmail = await this.userRepo.getUserByEmail(email);
    if (userByEmail) {
      return forbidden("Email já está em uso");
    }
    const user = await this.userRepo.createUser(
      email,
      hashedPassword,
      UserType.ATHLETE
    );

    const athlete = await this.athleteRepo.createAthlete(
      name,
      document,
      birthdate,
      height,
      weight,
      user
    );

    return success({
      id: athlete.id,
      name: athlete.name,
      email: athlete.user.email,
      document: athlete.document,
      birthdate: athlete.birthdate,
      height: athlete.height,
      weight: athlete.weight,
    });
  }
}
