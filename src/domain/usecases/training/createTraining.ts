import { NotificationService } from "../../../app/service/notification.service";
import { AthleteRepo } from "../../../infra/postgres/repo/AthleteRepo";
import { AthleteTrainingRepo } from "../../../infra/postgres/repo/AthleteTrainingRepo";
import { TeamRepo } from "../../../infra/postgres/repo/TeamRepo";
import { TrainingRepo } from "../../../infra/postgres/repo/TrainingRepo";
import { Athlete } from "../../../infra/postgres/schema/Athlete.schema";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class CreateTrainingUseCase {
  constructor(
    private trainingRepo: TrainingRepo,
    private teamRepo: TeamRepo,
    private athleteTrainingRepo: AthleteTrainingRepo,
    private athleteRepo: AthleteRepo
  ) {}

  async execute(id: number, data: any): Promise<any> {
    const { name, athletes: athletesId, sessions } = data;

    const team = await this.teamRepo.getTeam(id);
    if (!team) {
      return notFound("Time não encontrado");
    }

    const training = await this.trainingRepo.createTraining(
      team,
      name,
      sessions
    );

    const promise = athletesId.map(async (athleteId: string) => {
      return await this.athleteRepo.getAthlete(Number(athleteId));
    });
    const athletes = (await Promise.all(promise)).filter(
      (athlete: Athlete) => athlete
    );

    await this.athleteTrainingRepo.assignTrainingById(athletes, training);
    const promiseNotify = athletes.map(async (athlete: any) => {
      await NotificationService.send(athlete!.user.id, {
        title: "Novo treino",
        body: `Você recebeu um novo treino: ${training.name}`,
      });
    });
    await Promise.all(promiseNotify);

    return success(training);
  }
}
