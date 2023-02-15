import { Request, Response } from "express";
import { UserDataBase } from "../database/user.database";
import { ErrorServer } from "../erros/server.error";
import { UserModel } from "../models/user.model";
import { SuccessResponse } from "../success/success";

export class userController {
  public createUser(req: Request, res: Response) {
    try {
      const { name, user, password, confirmPassword } = req.body;
      const newUser = new UserModel(name, user, password, confirmPassword);
      const database = new UserDataBase();
      database.create(newUser);
      return SuccessResponse.createSuccess(
        res,
        "User was successfully create(O usuário foi criado com sucesso)",
        user
      );
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
}
