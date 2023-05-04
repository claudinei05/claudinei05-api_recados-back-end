import { Return } from "../../../shared/util/usecase.return";
import { UserRepository } from "../../user/repositores/user.repository";
import { ErrandsRepository } from "../repositores/errands.repository";

interface ListErrandsParams {
  userId: string;
}

export class ListErrandsUsecase {
  public async execute(data: ListErrandsParams): Promise<Return> {
    const database = new ErrandsRepository();
    const result = await database.list(data.userId);
    const databaseUser = new UserRepository();
    const validUser = await databaseUser.getID(data.userId);

    if (!validUser) {
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
