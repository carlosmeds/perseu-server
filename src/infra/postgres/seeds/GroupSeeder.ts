import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Athlete } from "../schema/Athlete.schema";
import { Group } from "../schema/Group.schema";
import { Team } from "../schema/Team.schema";
import { groupsToSeed } from "./input/group";

export class GroupSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    for (const groupToSeed of groupsToSeed) {
      const team = await dataSource.manager.findOneBy(Team, {
        id: groupToSeed.teamId,
      });

      const athletes = await Promise.all(
        groupToSeed.athletes.map(async (athleteId: number) => {
          const athlete = await dataSource.manager.findOneBy(Athlete, {
            id: athleteId,
          });

          return athlete!;
        })
      );

      const group = new Group();

      group.name = groupToSeed.name;
      group!.team = team!;
      group!.athletes = athletes!;

      await dataSource.manager.save(group);
    }
  }
}
