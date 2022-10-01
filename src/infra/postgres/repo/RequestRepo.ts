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

    const athleteStatus = status === RequestStatus.ACCEPTED ? UserStatus.ATHLETE_WITH_TEAM : UserStatus.ATHLETE_WITHOUT_TEAM;
    athlete.status = athleteStatus;
    athlete.updatedAt = new Date();
    await AppDataSource.manager.save(athlete);

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
