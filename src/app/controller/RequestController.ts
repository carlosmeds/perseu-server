import { Request, Response } from "express";
import { RequestStatus } from "../../domain/enum/RequestStatus";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { RequestRepo } from "../../infra/postgres/repo/RequestRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";

class RequestController {
  async getRequestsByTeam(req: Request, res: Response) {
    const { id } = req.params;
    const requestRepo = new RequestRepo();
    const requests = await requestRepo.getRequestsByTeam(Number(id));
    if (!requests) {
      return res.status(400).json({
        message: "Falha ao buscar solicitações",
      });
    }

    return res.json(requests);
  }

  async createRequest(req: Request, res: Response) {
    const { id } = req.params;
    const { code } = req.body;
    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return res.status(404).json({
        message: "Atleta não encontrado",
      });
    }

    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeamByCode(code);
    if (!team) {
      return res.status(404).json({
        message: "Time não encontrado por código",
      });
    }

    const requestRepo = new RequestRepo();
    await requestRepo.createRequest(athlete, team);

    return res.json({ message: "Request created" });
  }

  async acceptRequest(req: Request, res: Response) {
    const { teamId, athleteId } = req.params;

    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(athleteId));
    if (!athlete) {
      return res.status(404).json({
        message: "Atleta não encontrado",
      });
    }

    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeam(Number(teamId));
    if (!team) {
      return res.status(404).json({
        message: "Time não encontrado",
      });
    }

    const requestRepo = new RequestRepo();
    await requestRepo.updateRequestStatus(
      athlete,
      team,
      RequestStatus.ACCEPTED
    );

    await athleteRepo.updateTeam(athlete, team);

    return res.json({ message: "Request accepted" });
  }

  async declineRequest(req: Request, res: Response) {
    const { teamId, athleteId } = req.params;

    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(athleteId));
    if (!athlete) {
      return res.status(404).json({
        message: "Atleta não encontrado",
      });
    }

    const teamRepo = new TeamRepo();
    const team = await teamRepo.getTeam(Number(teamId));
    if (!team) {
      return res.status(404).json({
        message: "Time não encontrado",
      });
    }

    const requestRepo = new RequestRepo();
    await requestRepo.updateRequestStatus(
      athlete,
      team,
      RequestStatus.DECLINED
    );

    return res.json({ message: "Request declined" });
  }
}
export const requestController = new RequestController();
