import { Request, Response } from "express";
//import { users } from "../database/user";
import { UserDataBase } from "../database/repositories/user.database";
import { RequestError } from "../erros/request.error";
import { ErrorServer } from "../erros/server.error";
import { ErrandsModel } from "../models/errands.model";
import { ErrandsDatabase } from "../database/repositories/errands.database";

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

      const userDatabase = new UserDataBase();
      const users = await userDatabase.getID(userId);

      if (!users) {
        return RequestError.notFound(res, "User ");
      }

      const dataBase = new ErrandsDatabase();
      const result = await dataBase.create(
        userId,
        new ErrandsModel(description, detailing)
      );

      return res.status(201).send({
        ok: true,
        message: "Errands success created",
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

      const database = new ErrandsDatabase();
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
        message: "Growdever successfully updated",
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const database = new ErrandsDatabase();
      let result = await database.delete(id);

      if (result === 0) {
        return RequestError.notFound(res, "Errands ");
      }

      return res.status(200).send({
        ok: true,
        message: "Errands successfully deleted",
        data: result,
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing;
    }
  }
  public async listErrands(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const database = new ErrandsDatabase();
      const result = await database.list(userId);

      return res.status(200).send({
        ok: true,
        message: "Success",
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
