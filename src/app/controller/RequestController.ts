import { Request } from "express";
import { RequestStatus } from "../../domain/enum/RequestStatus";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { RequestRepo } from "../../infra/postgres/repo/RequestRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { notFound, success } from "../../main/presentation/httpHelper";

class RequestController {
  async getRequestsByTeam(req: Request) {
    const { id } = req.params;
    const requestRepo = new RequestRepo();
    const requests = await requestRepo.getRequestsByTeam(Number(id));
    if (!requests) {
      return notFound("Solicitações não encontradas");
    }

    return success(requests);
  }

  async getRequestByAthlete(req: Request) {
    const { teamId, athleteId } = req.params;

    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(athleteId));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeam(Number(teamId));
    if (!team) {
      return notFound("Time não encontrado por código");
    }
    const requestRepo = new RequestRepo();
    const requests = await requestRepo.getRequestByAthlete(athlete);
    if (!requests) {
      return notFound("Solicitações não encontradas");
    }

    return success(requests);
  }

  async createRequest(req: Request) {
    const { id } = req.params;
    const { code } = req.body;
    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeamByCode(code);
    if (!team) {
      return notFound("Time não encontrado por código");
    }

    const requestRepo = new RequestRepo();
    await requestRepo.createRequest(athlete, team);

    return success({ message: "Solicitação enviada" });
  }

  async acceptRequest(req: Request) {
    const { athleteId } = req.params;

    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(athleteId));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const requestRepo = new RequestRepo();
    const request = await requestRepo.updateRequestStatus(
      athlete,
      RequestStatus.ACCEPTED
    );

    await athleteRepo.updateAthleteTeam(athlete, request.team);

    return success({ message: "Solicitação aceita" });
  }

  async declineRequest(req: Request) {
    const { athleteId } = req.params;

    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(athleteId));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const requestRepo = new RequestRepo();
    await requestRepo.updateRequestStatus(athlete, RequestStatus.DECLINED);

    return success({ message: "Solicitação recusada" });
  }
}
export const requestController = new RequestController();
