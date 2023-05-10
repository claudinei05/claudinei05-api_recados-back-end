import { UserModel } from "../../../models/user.model";
import { UserRepository } from "../repositores/user.repository";
import { Return } from "../../../shared/util/usecase.return";
//import { CacheRepository } from "../../../shared/database/repositories/cache.repository";

interface CreateUserParams {
  name: string;
  user: string;
  password: string;
  confirmPassword: string;
}
//const userListCacheKey = "User_cache";

export class CreateUserUsecase {
  public async execute(data: CreateUserParams): Promise<Return> {
    const newUser = new UserModel(
      data.name,
      data.user,
      data.password,
      data.confirmPassword
    );
    // const cacheRepository = new CacheRepository();
    // const cacheResult = await cacheRepository.get<any>(userListCacheKey);
    // if (cacheResult !== null) {
    //   return {
    //     ok: true,
    //     //data: { cache: true, data: cacheResult },
    //     data: cacheResult,
    //     message:
    //       "Errands Listed Successfully Cache(Recados listado com sucesso cache)",
    //     code: 201,
    //   };
    // }
    const database = new UserRepository();

    const result = await database.createDatabase(newUser);

    // const cacheRepository = new CacheRepository();
    // await cacheRepository.delete("userCache");

    return {
      ok: true,
      data: result,
      message: "User was successfully created",
      code: 201,
    };
  }
}
