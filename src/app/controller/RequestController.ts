import { Request } from "express";
import { RequestStatus } from "../../domain/enum/RequestStatus";
import { UserStatus } from "../../domain/enum/UserStatus";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { RequestRepo } from "../../infra/postgres/repo/RequestRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";
import { notFound, success } from "../../main/presentation/httpHelper";

class RequestController {
  async getRequestsByTeam(req: Request) {
    const { id } = req.params;
    const requestRepo = new RequestRepo();

    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeam(Number(id));
    if (!team) {
      return notFound("Time não encontrado");
    }

    const requests = await requestRepo.getRequestsByTeam(team);
    if (!requests) {
      return notFound("Solicitações não encontradas");
    }

    return success(requests);
  }

  async getRequestByAthlete(req: Request) {
    const { athleteId } = req.params;

    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(athleteId));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const requestRepo = new RequestRepo();
    const request = await requestRepo.getRequestByAthlete(athlete);
    if (!request) {
      return notFound("Solicitação não encontradas");
    }

    return success(request);
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
    const request = await requestRepo.getRequestByAthlete(athlete);
    if (!request) {
      return notFound("Solicitação não encontrada");
    }

    const result = await requestRepo.updateRequestStatus(
      athlete,
      request,
      RequestStatus.ACCEPTED
    );

    await athleteRepo.updateAthleteTeam(athlete, result.team);

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
    const request = await requestRepo.getRequestByAthlete(athlete);
    if (!request) {
      return notFound("Solicitação não encontrada");
    }

    await requestRepo.updateRequestStatus(athlete, request, RequestStatus.DECLINED);

    return success({ message: "Solicitação recusada" });
  }

  async cancelRequest(req: Request) {
    const { athleteId } = req.params;
    console.log('cancelar')
    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(athleteId));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const requestRepo = new RequestRepo();
    const request = await requestRepo.getRequestByAthlete(athlete);
    await requestRepo.deleteRequestByAthlete(request);
    await athleteRepo.updateAthleteStatus(athlete, UserStatus.ATHLETE_WITHOUT_TEAM);

    return success({ message: "Solicitação cancelada" });
  }
}
export const requestController = new RequestController();
