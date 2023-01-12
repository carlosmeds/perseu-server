import { IsNull } from "typeorm";
import { RequestStatus } from "../../../domain/enum/RequestStatus";
import { UserStatus } from "../../../domain/enum/UserStatus";
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

    athlete.status = UserStatus.ATHLETE_WITH_PENDING_TEAM;
    athlete.updatedAt = new Date();
    await AppDataSource.manager.save(athlete);

    await AppDataSource.manager.save(request);
    return request;
  }

  async getRequestsByTeam(team: Team) {
    const requests = await AppDataSource.manager.find(Request, {
      relations: ["athlete"],
      where: { team, status: RequestStatus.PENDING, athlete: { deletedAt: IsNull() } },
    });

    return requests;
  }

  async updateRequestStatus(athlete: Athlete, request: Request, status: RequestStatus) {
    request.status = status;
    request.updatedAt = new Date();
    const result = await AppDataSource.manager.save(request);

    const athleteStatus =
      status === RequestStatus.ACCEPTED
        ? UserStatus.ATHLETE_WITH_TEAM
        : UserStatus.ATHLETE_WITHOUT_TEAM;
    athlete.status = athleteStatus;
    athlete.updatedAt = new Date();
    await AppDataSource.manager.save(athlete);

    return result;
  }

  async getRequestByAthlete(athlete: Athlete) {
    const [request] = await AppDataSource.manager.find(Request, {
      relations: ["team"],
      order: { updatedAt: "DESC" },
      where: { athlete: { id: athlete.id } },
    });

    return request;
  }

  async deleteRequestByAthlete(request: Request) {
    await AppDataSource.manager.remove(request);
  }

  async deleteFromTeam(team: Team) {
    await AppDataSource.manager.delete(Request, { team });
  }
}
