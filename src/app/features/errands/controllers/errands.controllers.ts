import { Request, Response } from "express";
import { RequestError } from "../../../shared/erros/request.error";
import { ErrorServer } from "../../../shared/erros/server.error";
import { createErrandsUsecaseFactory } from "../util/create-errands-usecase.factory";
import { ListErrandsUsecase } from "../usecase/list-errands.usecase";
import { DeleteErrandsUsecase } from "../usecase/delete-errands.usecase";
import { UpdateErrandsUsecase } from "../usecase/update-errands.usecase";

export class ErrandsController {
  public async createErrands(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      let { description, detailing } = req.body;

      if (description === "" && detailing === "") {
        return RequestError.fieldNotProvaider(res, "Description ou Detailing ");
      }
      if (description < 3 && detailing < 3) {
        return res.status(400).send({
          ok: false,
          massage:
            " Minimum number of characters was not provided (Minimo 03 caracters)",
        });
      }

      const usecase = createErrandsUsecaseFactory();
      const result = await usecase.execute({ userId, description, detailing });
      return res.status(result.code).send(result);
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { errandsId } = req.params;
      const { description, detailing } = req.body;

      const usecase = new UpdateErrandsUsecase();
      const result = await usecase.execute({
        errandsId,
        description,
        detailing,
      });

      // if (description === "" && detailing === "") {
      //   return RequestError.fieldNotProvaider(res, "Description or detail  ");
      // }

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usecase = new DeleteErrandsUsecase();
      const result = await usecase.execute({
        id,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ErrorServer.errorServerProcessing;
    }
  }
  public async listErrands(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const usecase = new ListErrandsUsecase();
      const result = await usecase.execute({
        userId,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
