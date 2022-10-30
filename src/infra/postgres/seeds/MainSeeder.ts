import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { AdminSeeder } from "./AdminSeeder";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, AdminSeeder);
  }
}
