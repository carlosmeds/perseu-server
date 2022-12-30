import { Pagination } from "../../../app/service/pagination.service";
import { UserRepo } from "../../../infra/postgres/repo/UserRepo";
import { success } from "../../../main/presentation/httpHelper";

export class GetCoachesUseCase {
  constructor(private userRepo: UserRepo) {}

  async execute(filters: any): Promise<any> {
    const pages = Pagination.paginate(filters);

    const [coaches, total] = await this.userRepo.getCoaches(
      pages.skip,
      pages.pageSize,
      pages.search
    );

    const result = coaches.map((coach) => {
      return {
        id: coach.id,
        name: coach.name,
        email: coach.user.email,
        team: coach?.team?.name ?? null,
        createdAt: coach.createdAt,
      };
    });

    return success({
      coaches: result,
      count: total,
      page: pages.page,
      pageSize: pages.pageSize,
    });
  }
}
