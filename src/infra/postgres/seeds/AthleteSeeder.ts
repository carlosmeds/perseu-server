import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CryptoService } from "../../../app/service/crypto.service";
import { UserType } from "../../../domain/enum/UserType";
import { Athlete } from "../schema/Athlete.schema";
import { User } from "../schema/User.schema";
import { athletesToSeed } from "./input/athlete";

export class AthleteSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    for (const athleteToSeed of athletesToSeed) {
      const user = new User();
      user.email = athleteToSeed.email;
      user.password = await CryptoService.hash("1234");
      user.type = UserType.ATHLETE;
      user.createdAt = athleteToSeed.createdAt;
      user.updatedAt = athleteToSeed.createdAt;

      await dataSource.manager.save(user);

      const athlete = new Athlete();
      athlete.name = athleteToSeed.name;
      athlete.document = athleteToSeed.document;
      athlete.birthdate = athleteToSeed.birthdate;
      athlete.height = athleteToSeed.height;
      athlete.weight = athleteToSeed.weight;
      athlete.user = user;
      athlete.createdAt = athleteToSeed.createdAt;
      athlete.updatedAt = athleteToSeed.createdAt;

      await dataSource.manager.save(athlete);
    }
  }
}
