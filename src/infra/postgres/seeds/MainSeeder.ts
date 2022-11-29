import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { AdminSeeder } from "./AdminSeeder";
import { AthleteSeeder } from "./AthleteSeeder";
import { CoachSeeder } from "./CoachSeeder";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, AdminSeeder);
    await runSeeder(dataSource, CoachSeeder);
    await runSeeder(dataSource, AthleteSeeder);
  }
}
