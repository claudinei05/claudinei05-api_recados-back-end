import { Request, Response } from "express";
import { RequestError } from "../../../shared/erros/request.error";
import { ErrorServer } from "../../../shared/erros/server.error";
import { ErrandsRepository } from "../repositores/errands.repository";
import { createErrandsUsecaseFactory } from "../util/create-errands-usecase.factory";

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

      const database = new ErrandsRepository();
      const result = await database.updateWithSave(
        errandsId,
        description,
        detailing
      );
      if (description === "" && detailing === "") {
        return RequestError.fieldNotProvaider(res, "Description ou Detailing ");
      }
      if (result === 0) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "Errand successfully updated (Recado atualizado com sucesso)",
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const database = new ErrandsRepository();
      let result = await database.delete(id);

      if (result === 0) {
        return RequestError.notFound(res, "Errands ");
      }

      return res.status(200).send({
        ok: true,
        message: "Errand successfully deleted (Recado excluído com sucesso)",
        data: result,
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing;
    }
  }
  public async listErrands(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const database = new ErrandsRepository();
      const result = await database.list(userId);
      // const test = userId;
      // if (!result) {
      //   return {
      //     ok: false,
      //     message: " User not found(Usuario não encontrado)",
      //     code: 404,
      //   };
      // }
      return res.status(200).send({
        ok: true,
        message: "Errands listed successfully (Recados listados com sucesso)",
        date: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
