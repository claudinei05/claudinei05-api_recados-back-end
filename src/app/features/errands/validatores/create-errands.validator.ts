import { NextFunction, Request, Response } from "express";
import { ErrorServer } from "../../../shared/erros/server.error";
import { RequestError } from "../../../shared/erros/request.error";

export class CreateErrandsValidator {
  public static async errandsValidate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { description, detailing } = req.body;

      if (description === "" && detailing === "") {
        return RequestError.fieldNotProvaider(res, "Description ou Detailing ");
      }
      if (description < 3 && detailing < 5) {
        return res.status(400).send({
          ok: false,
          massage:
            " Minimum number of characters was not provided (Minimo 03 caracters)",
        });
      }
      next();
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
}
