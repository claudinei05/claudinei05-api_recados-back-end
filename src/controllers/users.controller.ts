import { Request, Response } from "express";
import { UserDataBase } from "../database/user.database";
import { RequestError } from "../erros/request.error";
import { ErrorServer } from "../erros/server.error";
import { UserModel } from "../models/user.model";
import { SuccessResponse } from "../success/success";

export class userController {
  public createUser(req: Request, res: Response) {
    try {
      const { name, user, password, confirmPassword } = req.body;
      const newUser = new UserModel(name, user, password, confirmPassword);
      const database = new UserDataBase();
      if (
        name === "" ||
        user === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        return res.status(404).send({
          ok: false,
          message: "Fill in the fields (preencha os campos)",
        });
      }
      if (password.length < 5 || confirmPassword.length < 5) {
        return res.status(404).send({
          ok: false,
          message:
            " Password needs at least 5 characters (A senha precisa de pelo menos 5 caracteres)",
        });
      }

      if (password !== confirmPassword) {
        return res.status(404).send({
          ok: false,
          message: " Password does not match(Senha não confere)",
        });
      }
      database.create(newUser);
      return res.status(200).send({
        ok: true,
        message: "O usuário foi criado com sucesso",
        data: newUser.toJson(),
      });
      // return SuccessResponse.createSuccess(
      //   res,
      //   "User was successfully create(O usuário foi criado com sucesso)",
      //   newUser
      // );
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
  public loginUser(req: Request, res: Response) {
    try {
      const { user, password } = req.body;
      const database = new UserDataBase();
      if (!user || !password) {
        return RequestError.fieldNotProvaider(res, "User and Password fields");
      }
      const users = database.list();
      const returnUser = users.find(
        (valUser) => valUser.user === user && valUser.password === password
      );
      if (!returnUser) {
        return res.status(401).send({
          ok: false,
          message: "Invalid credentials",
        });
      }
      return res.status(200).send({
        ok: true,
        message: "Login successfully done",
        data: returnUser.toJson(),
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing;
    }
  }
}
