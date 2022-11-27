import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CryptoService } from "../../../app/service/crypto.service";
import { UserType } from "../../../domain/enum/UserType";
import { Coach } from "../schema/Coach.schema";
import { Team } from "../schema/Team.schema";
import { User } from "../schema/User.schema";
import { coachesToSeed } from "./input/coach";

export class CoachSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    for (const coachToSeed of coachesToSeed) {
      const user = new User();
      user.email = coachToSeed.email;
      user.password = await CryptoService.hash("1234");
      user.type = UserType.COACH;
      user.createdAt = coachToSeed.createdAt;
      user.updatedAt = coachToSeed.createdAt;

      await dataSource.manager.save(user);

      const coach = new Coach();
      coach.name = coachToSeed.name;
      coach.document = coachToSeed.document;
      coach.birthdate = coachToSeed.birthdate;
      coach.cref = coachToSeed.cref;
      coach.user = user;
      coach.status = coachToSeed.status;
      coach.createdAt = coachToSeed.createdAt;
      coach.updatedAt = coachToSeed.createdAt;
      await dataSource.manager.save(coach);

      if (coachToSeed.team) {
        const team = new Team();
        team.name = coachToSeed.team.name;
        team.code = coachToSeed.team.code;
        team.coach = coach;

        await dataSource.manager.save(team);
      }
    }
  }
}
