import { Return } from "../../../shared/util/usecase.return";
import { ErrandsRepository } from "../repositores/errands.repository";

interface ListErrandsParams {
  id: string;
}

export class DeleteErrandsUsecase {
  public async execute(data: ListErrandsParams): Promise<Return> {
    const database = new ErrandsRepository();

    let result = await database.delete(data.id);

    if (result === 0) {
      return {
        ok: false,
        message: " Message not found(Recado não encontrado)",
        code: 404,
      };
    }

    return {
      ok: true,
      message: "Errand successfully deleted (Recado excluído com sucesso)",
      code: 201,
    };
  }
}
