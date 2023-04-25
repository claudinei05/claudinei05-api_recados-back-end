import { NextFunction, Request, Response } from "express";
import { ErrorServer } from "../erros/server.error";
import { RequestError } from "../erros/request.error";
//import { UserDataBase } from "../../features/user/repositores/user.repository";

// export class LoginValidatorMiddleware {
//   public static async loginValidator(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const { user, password } = req.body;
//       const database = new UserDataBase();
//       const validUser = await database.login(user, password);
//       if (!validUser) {
//         return RequestError.notFound(res, "User123");
//       } else if (!password) {
//         return RequestError.fieldNotProvaider(res, "Password");
//       }

//       next();
//     } catch (error: any) {
//       return ErrorServer.errorServerProcessing(res, error);
//     }
//   }
// }
