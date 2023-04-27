// import { Return } from "../../../shared/util/usecase.return";
// import { UserRepository } from "../repositores/user.repository";

// interface loginUserParams {
//   user: string;
//   password: string;
// }

// export class LoginValidator {
//   public async execute(data: loginUserParams): Promise<Return | undefined> {
//     const database = new UserRepository();

//     const result = await database.login(data.user, data.password);
//     if (!result) {
//       return {
//         ok: false,
//         message: "Invalid credentials (Credenciais inválidas)",
//         code: 401,
//       };
//     }
//   }
// }
