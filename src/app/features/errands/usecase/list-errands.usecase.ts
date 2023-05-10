import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/usecase.return";
import { UserRepository } from "../../user/repositores/user.repository";
import { ErrandsRepository } from "../repositores/errands.repository";

interface ListErrandsParams {
  userId: string;
}
const errandsListCacheKey = "errands";

export class ListErrandsUsecase {
  public async execute(data: ListErrandsParams): Promise<Return> {
    const cacheRepository = new CacheRepository();
    const cacheResult = await cacheRepository.get<any>(errandsListCacheKey);
    if (cacheResult !== null) {
      return {
        ok: true,
        //data: { cache: true, data: cacheResult },
        message:
          "Errands Listed Successfully Cache(Recados listado com sucesso cache)",
        code: 201,
        data: cacheResult,
      };
    }

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
    await cacheRepository.set(errandsListCacheKey, result);
    return {
      ok: true,
      message: "Errands Listed Successfully (Recados listado com sucesso)",
      code: 201,
      data: result,
    };
  }
}
