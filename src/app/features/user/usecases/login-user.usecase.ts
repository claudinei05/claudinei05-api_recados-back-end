import { Return } from "../../../shared/util/usecase.return";
import { UserRepository } from "../repositores/user.repository";

interface loginUserParams {
  user: string;
  password: string;
}
export class LoginUserUsecase {
  public async execute(data: loginUserParams): Promise<Return> {
    const database = new UserRepository();

    const result = await database.login(data.user, data.password);
    if (!result) {
      return {
        ok: false,
        message: "Invalid credentials (Credenciais inválidas)",
        code: 401,
      };
    }
    return {
      ok: true,
      data: result,
      message: "Login successfully done (Login feito com sucesso)",
      code: 200,
    };
  }
}
