//import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/usecase.return";
import { UserRepository } from "../repositores/user.repository";

interface loginUserParams {
  user: string;
  password: string;
}
//const userListCacheKey = "User_cache";
export class LoginUserUsecase {
  public async execute(data: loginUserParams): Promise<Return> {
    // const cacheRepository = new CacheRepository();
    // const cacheResult = await cacheRepository.get<any>(userListCacheKey);
    // if (cacheResult !== null) {
    //   return {
    //     ok: true,
    //     data: cacheResult,
    //     message: "Login successfully done cache(Login feito com sucesso cache)",
    //     code: 201,
    //   };
    // }
    const database = new UserRepository();

    const result = await database.login(data.user, data.password);

    //await cacheRepository.set(userListCacheKey, result);

    return {
      ok: true,
      data: result,
      message: "Login successfully done (Login feito com sucesso)",
      code: 200,
    };
  }
}
