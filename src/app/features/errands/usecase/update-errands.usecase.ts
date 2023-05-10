import { Return } from "../../../shared/util/usecase.return";
import { ErrandsRepository } from "../repositores/errands.repository";

interface UpdateErrandsParams {
  errandsId: string;
  description: string;
  detailing: string;
}

export class UpdateErrandsUsecase {
  public async execute(data: UpdateErrandsParams): Promise<Return> {
    const database = new ErrandsRepository();

    const result = await database.updateWithSave(
      data.errandsId,
      data.description,
      data.detailing
    );
    // const teste = await database.get(data.description, data.detailing);
    // if (!teste) {
    //   return teste;
    // }

    if (!result) {
      return {
        ok: false,
        message: " User not found(Usuario não encontrado)",
        code: 404,
      };
    }
    return {
      ok: true,
      data: result,
      message: "Errands Listed Successfully (Recados listado com sucesso)",
      code: 201,
    };
  }
}
