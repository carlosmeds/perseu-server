import { Pagination } from "../../../app/service/pagination.service";
import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { success } from "../../../main/presentation/httpHelper";

export class GetAthletesUseCase {
  constructor(private userRepo: UserRepo) {}

  async execute(filters: any): Promise<any> {
    const pages = Pagination.paginate(filters);

    const [athletes, total] = await this.userRepo.getAthletes(
      pages.skip,
      pages.pageSize,
      pages.search
    );

    const result = athletes.map((athlete) => {
      return {
        id: athlete.id,
        name: athlete.name,
        email: athlete.user.email,
        team: athlete?.team?.name ?? null,
        createdAt: athlete.createdAt,
      };
    });

    return success({
      athletes: result,
      count: total,
      page: pages.page,
      pageSize: pages.pageSize,
    });
  }
}
