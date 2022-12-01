import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { RequestStatus } from "../../../domain/enum/RequestStatus";
import { Athlete } from "../schema/Athlete.schema";
import { Request } from "../schema/Request.schema";
import { Team } from "../schema/Team.schema";
import { requestsToSeed } from "./input/request";

export class RequestSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    for (const requestToSeed of requestsToSeed) {
      const athlete = await dataSource.manager.findOneBy(Athlete, {
        id: requestToSeed.athleteId,
      });
      const team = await dataSource.manager.findOneBy(Team, {
        id: requestToSeed.teamId,
      });

      const request = new Request();
      request.athlete = athlete!;
      request.team = team!;
      request.status = requestToSeed.requestStatus;
      request.createdAt = requestToSeed.createdAt;
      request.updatedAt = requestToSeed.createdAt;

      await dataSource.manager.save(request);

      if (requestToSeed.requestStatus === RequestStatus.ACCEPTED) {
        athlete!.status = requestToSeed.athleteStatus;
        athlete!.team = team!;
        athlete!.updatedAt = requestToSeed.createdAt;
        await dataSource.manager.save(athlete);
      } else if (requestToSeed.requestStatus === RequestStatus.PENDING) {
        athlete!.status = requestToSeed.athleteStatus;
        athlete!.updatedAt = requestToSeed.createdAt;
        await dataSource.manager.save(athlete);
      }
    }
  }
}
