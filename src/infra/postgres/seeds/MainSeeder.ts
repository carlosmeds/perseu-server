import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { AdminSeeder } from "./AdminSeeder";
import { AthleteSeeder } from "./AthleteSeeder";
import { AthleteTrainingSeeder } from "./AthleteTrainingSeeder";
import { CoachSeeder } from "./CoachSeeder";
import { RequestSeeder } from "./RequestSeeder";
import { TrainingSeeder } from "./TrainingSeeder";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, AdminSeeder);
    await runSeeder(dataSource, CoachSeeder);
    await runSeeder(dataSource, AthleteSeeder);
    await runSeeder(dataSource, RequestSeeder);
    await runSeeder(dataSource, TrainingSeeder);
    await runSeeder(dataSource, AthleteTrainingSeeder);
  }
}
