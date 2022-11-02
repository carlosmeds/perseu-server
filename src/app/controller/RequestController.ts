import { Request } from "express";
import { AcceptRequestUseCase } from "../../domain/usecases/request/acceptRequest";
import { CancelRequestUseCase } from "../../domain/usecases/request/cancelRequest";
import { CreateRequestUseCase } from "../../domain/usecases/request/createRequest";
import { DeclineRequestUseCase } from "../../domain/usecases/request/declineRequest";
import { GetRequestByAthleteUseCase } from "../../domain/usecases/request/getRequestByAthlete";
import { GetRequestsByTeamUseCase } from "../../domain/usecases/request/getRequestsByTeam";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { RequestRepo } from "../../infra/postgres/repo/RequestRepo";
import { TeamRepo } from "../../infra/postgres/repo/TeamRepo";

class RequestController {
  async getRequestsByTeam(req: Request) {
    const { id } = req.params;
    const requestRepo = new RequestRepo();
    const teamRepo = new TeamRepo();

    const getRequestsByTeamUseCase = new GetRequestsByTeamUseCase(
      requestRepo,
      teamRepo
    );
    return await getRequestsByTeamUseCase.execute(Number(id));
  }

  async getRequestByAthlete(req: Request) {
    const { athleteId } = req.params;
    const athleteRepo = new AthleteRepo();
    const requestRepo = new RequestRepo();

    const getRequestsByTeamUseCase = new GetRequestByAthleteUseCase(
      requestRepo,
      athleteRepo
    );
    return await getRequestsByTeamUseCase.execute(Number(athleteId));
  }

  async createRequest(req: Request) {
    const { id } = req.params;
    const { code } = req.body;

    const athleteRepo = new AthleteRepo();
    const teamRepo = new TeamRepo();
    const requestRepo = new RequestRepo();

    const createRequestUseCase = new CreateRequestUseCase(
      athleteRepo,
      teamRepo,
      requestRepo
    );
    return await createRequestUseCase.execute(Number(id), code);
  }

  async acceptRequest(req: Request) {
    const { athleteId } = req.params;

    const athleteRepo = new AthleteRepo();
    const requestRepo = new RequestRepo();

    const acceptRequestUseCase = new AcceptRequestUseCase(
      athleteRepo,
      requestRepo
    );
    return await acceptRequestUseCase.execute(Number(athleteId));
  }

  async declineRequest(req: Request) {
    const { athleteId } = req.params;

    const athleteRepo = new AthleteRepo();
    const requestRepo = new RequestRepo();

    const declineRequestUseCase = new DeclineRequestUseCase(
      athleteRepo,
      requestRepo
    );
    return await declineRequestUseCase.execute(Number(athleteId));
  }

  async cancelRequest(req: Request) {
    const { athleteId } = req.params;

    const requestRepo = new RequestRepo();
    const athleteRepo = new AthleteRepo();

    const cancelRequestUseCase = new CancelRequestUseCase(
      requestRepo,
      athleteRepo
    );
    return await cancelRequestUseCase.execute(Number(athleteId));
  }
}

export const requestController = new RequestController();
