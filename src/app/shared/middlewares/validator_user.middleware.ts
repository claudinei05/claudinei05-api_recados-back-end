// import { NextFunction, Request, Response } from "express";
// import { UserRepository } from "../../features/user/repositores/user.repository";
// import { ErrorServer } from "../erros/server.error";

// export class CreateUserValidator {
//   public static async userValidate(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const { user } = req.body;

//       const database = new UserRepository();
//       const validUser = await database.getUser(user);
//       if (validUser) {
//         return res.status(400).send({
//           ok: false,
//           message: "User already exists (User já existe)",
//         });
//       }
//       next();
//     } catch (error: any) {
//       return ErrorServer.errorServerProcessing(res, error);
//     }
//   }
// }
