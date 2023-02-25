import { Request, Response } from "express";
import { users } from "../database/user";
import { UserDataBase } from "../database/user.database";
import { RequestError } from "../erros/request.error";
import { ErrorServer } from "../erros/server.error";
import { ErrandsModel } from "../models/errands.model";

export class ErrandsController {
  public createErrands(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      let { id, description, detailing } = req.body;
      const database = new UserDataBase();
      id = userId;

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

      const users = database.getId(userId);
      // if (!users) {
      //   return RequestError.notFound(res, "User ");
      // }
      const note = new ErrandsModel(description, detailing);
      users?.errands.push(note);
      return res.status(201).send({
        ok: true,
        message: "Errands success created",
        date: users,
      });
    } catch (error: any) {
      return RequestError.fieldNotProvaider(res, "Errands ");
    }
  }
  public edit(req: Request, res: Response) {
    try {
      const { userId, id } = req.params;
      const { description, detailing } = req.body;
      const database = new UserDataBase();
      const user = database.getId(userId);
      if (!user) {
        return RequestError.fieldNotProvaider(res, "User ");
      }
      const note = user.errands.find((item) => item.id === id);
      if (!note) {
        return RequestError.notFound(res, "Errands ");
      }
      if (description) {
        note.description = description;
      }
      if (detailing) {
        note.detailing = detailing;
      }
      return res.status(202).send({
        ok: true,
        message: "Successfully updated",
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public delete(req: Request, res: Response) {
    try {
      const { userId, id } = req.params;
      const database = new UserDataBase();
      let user = database.getId(userId);
      if (!id) {
        return RequestError.notFound(res, "Id ");
      }
      if (!user) {
        return RequestError.notFound(res, "User ");
      }
      let note = user.errands.findIndex((item) => {
        return item.id === id;
      });
      if (note < 0) {
        return RequestError.notFound(res, "Errands ");
      }
      user.errands.splice(note, 1);
      return res.status(200).send({
        ok: true,
        message: "Errands successfully deleted",
        data: user,
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing;
    }
  }
  public listErrands(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const database = new UserDataBase();
      const user = database.getId(userId);
      if (!user) {
        return RequestError.fieldNotProvaider(res, "User ");
      }
      let note = user.errands.map((item) => {
        return {
          description: item.description,
          detailing: item.detailing,
        };
      });
      return res.status(200).send({
        ok: true,
        message: "Success",
        date: note,
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing;
    }
  }
}
