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

    await AppDataSource.manager.save(request);
    return request;
  }

  async getRequestsByTeam(id: number) {
    const team = await AppDataSource.manager.findOneBy(Team, { id });
    if (!team) {
      throw new Error("Team not found");
    }
    const requests = await AppDataSource.manager.find(Request, {
      relations: ["athlete"],
      where: { team, status: RequestStatus.PENDING },
    });

    return requests;
  }

  async updateRequestStatus(
    athlete: Athlete,
    status: RequestStatus
  ) {
    const [request] = await AppDataSource.manager.find(Request, {
      relations: ["team"],
      order: { updatedAt: "DESC" },
      where: { athlete },
    });
    if (!request) {
      throw new Error("Request not found");
    }

    request.status = status;
    request.updatedAt = new Date();
    const result = await AppDataSource.manager.save(request);

    return result
  }

  async getRequestByAthlete(athlete: Athlete) {
    const [request] = await AppDataSource.manager.find(Request, {
      order: { updatedAt: "DESC" },
      where: { athlete },
    });

    return request;
  }
}
