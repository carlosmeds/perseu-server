import { RequestStatus } from "../../../domain/enum/RequestStatus";
import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { Request } from "../schema/Request.schema";
import { Team } from "../schema/Team.schema";

export class RequestRepo {
  async createRequest(athlete: Athlete, team: Team) {
    const request = new Request();
    request.athlete = athlete;
    request.team = team;
    request.status = RequestStatus.PENDING;
    request.createdAt = new Date();
    request.updatedAt = new Date();

    await AppDataSource.manager.save(request);
    return request;
  }
}
