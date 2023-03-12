import { NextFunction, Request, Response } from "express";
import { ErrorServer } from "../erros/server.error";
import { RequestError } from "../erros/request.error";

export class LoginValidatorMiddleware {
  public static loginValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user, password } = req.body;
      if (!user) {
        return RequestError.fieldNotProvaider(res, "User");
      }
      if (!password) {
        return RequestError.fieldNotProvaider(res, "Password");
      }

      next();
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
}
