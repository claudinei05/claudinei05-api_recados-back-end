import { NextFunction, Request, Response } from "express";
import { UserDataBase } from "../database/repositories/user.database";
import { ErrorServer } from "../erros/server.error";

export class ValidatorMiddlewarUser {
  public static userValidMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user } = req.body;

      const database = new UserDataBase();
      const validUser = database.getUser(user);
      if (validUser) {
        return res.status(400).send({
          ok: false,
          message: "User already exists (User já existe)",
        });
      }
      next();
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
}
