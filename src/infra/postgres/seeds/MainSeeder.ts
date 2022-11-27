import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { AdminSeeder } from "./AdminSeeder";
import { CoachSeeder } from "./CoachSeeder";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, AdminSeeder);
    await runSeeder(dataSource, CoachSeeder);
  }
}
