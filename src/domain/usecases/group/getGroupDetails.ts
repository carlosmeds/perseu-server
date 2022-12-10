import { GroupRepo } from "../../../infra/postgres/repo/GroupRepo";
import { notFound, success } from "../../../main/presentation/httpHelper";

export class GetGroupByIdUseCase {
  constructor(private groupRepo: GroupRepo) {}

  async execute(id: number): Promise<any> {
    const group = await this.groupRepo.getGroupById(id);

    if (!group) {
      return notFound("Grupo não encontrado");
    }

    return success({
      id: group.id,
      name: group.name,
      athletes: group.athletes.map(({ id, name }) => ({ id, name })),
    });
  }
}
