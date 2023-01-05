import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { CheckInRepo } from "../../../infra/postgres/repo/CheckInRepo";
import { CoachRepo } from "../../../infra/postgres/repo/CoachRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { TrainingRepo } from "../../../infra/postgres/repo/TrainingRepo";
import { success } from "../../../main/presentation/httpHelper";

export class GetStatsUseCase {
  constructor(
    private athleteRepo: AthleteRepo,
    private coachRepo: CoachRepo,
    private teamRepo: TeamRepo,
    private trainingRepo: TrainingRepo,
    private checkInRepo: CheckInRepo
  ) {}

  async execute(): Promise<any> {
    const athletes = await this.athleteRepo.countAthletes();
    const coaches = await this.coachRepo.countCoaches();
    const teams = await this.teamRepo.countTeams();
    const trainingsByTeam = await this.trainingRepo.getTrainingsByTeams();
    const checkInsByTeam = await this.checkInRepo.getCheckInsByTeams();

    return success({
      coaches,
      athletes,
      teams,
      trainingsByTeam,
      checkInsByTeam,
    });
  }
}
