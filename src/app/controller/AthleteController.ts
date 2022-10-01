import { Request } from "express";
import { AthleteRepo } from "../../infra/postgres/repo/AthleteRepo";
import { notFound, success } from "../../main/presentation/httpHelper";

class AthleteController {
  async getAthlete(req: Request) {
    const { id } = req.params;
    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    return success(athlete);
  }

  async updateAthlete(req: Request) {
    const { id } = req.params;
    const { name, document, birthdate, height, weight } = req.body;
    const athleteRepo = new AthleteRepo();
    const athlete = await athleteRepo.getAthlete(Number(id));
    if (!athlete) {
      return notFound("Atleta não encontrado");
    }

    const newAthlete = await athleteRepo.updateAthlete(
      athlete,
      name,
      document,
      birthdate,
      height,
      weight
    );

    return success(newAthlete);
  }
}
export const athleteController = new AthleteController();
