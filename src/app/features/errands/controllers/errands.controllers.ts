import { Request, Response } from "express";
//import { users } from "../database/user";
import { UserRepository } from "../../user/repositores/user.repository";
import { RequestError } from "../../../shared/erros/request.error";
import { ErrorServer } from "../../../shared/erros/server.error";
import { ErrandsModel } from "../../../models/errands.model";
import { ErrandsRepository } from "../repositores/errands.repository";

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
            " Minimum number of characters was not provided (Minimum 03 caracters)",
        });
      }

      const userRepository = new UserRepository();
      const users = await userRepository.getID(userId);

      if (!users) {
        return RequestError.notFound(res, "User ");
      }

      const dataBase = new ErrandsRepository();
      const result = await dataBase.create(
        userId,
        new ErrandsModel(description, detailing)
      );

      return res.status(201).send({
        ok: true,
        message: "Errands success created (Recados criados com sucesso)",
        date: result.toJson(),
      });
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
