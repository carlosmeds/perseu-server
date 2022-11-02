import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { TrainingRepo } from "../../../infra/postgres/repo/TrainingRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetTeamDetailsUseCase {
  constructor(
    private teamRepo: TeamRepo,
    private trainingRepo: TrainingRepo,
    private athleteRepo: AthleteRepo
  ) {}
  async execute(id: number) {
    const team = await this.teamRepo.getTeam(id);
    if (!team) {
      return notFound("Time não encontrado");
    }

    const trainings = await this.trainingRepo.countTrainingByTeam(team);
    const athletes = await this.athleteRepo.countAthletesByTeam(team);

    return success({
      ...team,
      trainingsCount: trainings,
      athletesCount: athletes,
    });
  }
}
