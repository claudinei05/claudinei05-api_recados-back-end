import { NextFunction, Request, Response } from "express";
import { Return } from "../../../shared/util/usecase.return";
import { UserRepository } from "../repositores/user.repository";
import { ErrorServer } from "../../../shared/erros/server.error";

export class LoginUserValidator {
  public static async loginValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user, password } = req.body;
      const database = new UserRepository();
      const result = await database.login(user, password);
      if (!result) {
        return res.status(401).send({
          ok: false,
          message: "Invalid credentials (Credenciais inválidas)",
        });
      }
      next();
    } catch (error) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
}
