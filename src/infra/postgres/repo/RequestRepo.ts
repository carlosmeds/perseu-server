import { request } from "http";
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
    team: Team,
    status: RequestStatus
  ) {
    const request = await AppDataSource.manager.findOneBy(Request, {
      athlete,
      team,
    });
    if (!request) {
      throw new Error("Request not found");
    }
    request.status = status;
    request.updatedAt = new Date();
    await AppDataSource.manager.save(request);
  }

  async getRequestByAthlete(athlete: Athlete, team: Team) {
    const request = await AppDataSource.manager.findOne(Request, {
      order: { updatedAt: "DESC" },
      where: { athlete, team },
    });

    return request;
  }
}
