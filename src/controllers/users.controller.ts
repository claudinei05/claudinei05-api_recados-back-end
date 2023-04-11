import { Request, Response } from "express";
import { UserDataBase } from "../database/repositories/user.database";
import { RequestError } from "../erros/request.error";
import { ErrorServer } from "../erros/server.error";
import { UserModel } from "../models/user.model";
import { SuccessResponse } from "../success/success";

export class userController {
  public async createUser(req: Request, res: Response) {
    try {
      const { name, user, password, confirmPassword } = req.body;
      const newUser = new UserModel(name, user, password, confirmPassword);
      const database = new UserDataBase();

      // if (user === user) {
      //   return res.status(400).send({
      //     ok: false,
      //     message: "User already exists (Usuario já existe)",
      //   });
      // }
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
      if (user.length < 5) {
        return res.status(404).send({
          ok: false,
          message:
            " The user needs at least 5 characters (O usuário precisa de pelo menos 5 caracteres)",
        });
      }

      if (password !== confirmPassword) {
        return res.status(404).send({
          ok: false,
          message: " Password does not match(Senha não confere)",
        });
      }
      const result = await database.create(newUser);
      // return res.status(200).send({
      //   ok: true,
      //   message:
      //     "User was successfully create(O usuário foi criado com sucesso)",
      //   data: result,
      // });
      return SuccessResponse.createSuccess(
        res,
        "User was successfully create(O usuário foi criado com sucesso)",
        result
      );
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
  // public async listUser(req: Request, res: Response) {
  //   try {
  //     const { userId } = req.params;
  //     const database = new UserDataBase();
  //     const user = await database.getID(userId);
  //     if (!user) {
  //       return RequestError.fieldNotProvaider(res, "User ");
  //     }
  //     // let note = user.errands.map((item) => {
  //     //   return {
  //     //     description: item.description,
  //     //     detailing: item.detailing,
  //     //   };
  //     // });
  //     return res.status(200).send({
  //       ok: true,
  //       message: "Success",
  //       date: user.toJson(),
  //     });
  //   } catch (error: any) {
  //     return ErrorServer.errorServerProcessing;
  // }
  //}
  //   public async list(req: Request, res: Response) {
  //     try {
  //         const { user } = req.query;

  //         const database = new UserDataBase();
  //         let listUser = await database.list(
  //             user ? String(user)
  //         );

  //         const result = listUser.map((user) => user.toJson());

  //         res.status(200).send({
  //             ok: true,
  //             message: "Growdevers successfully listed",
  //             data: result,
  //         });
  //     } catch (error: any) {
  //         return ErrorServer.errorServerProcessing(res, error);
  //     }
  // }

  public async loginUser(req: Request, res: Response) {
    try {
      const { user, password } = req.body;
      const database = new UserDataBase();
      if (!user || !password) {
        return RequestError.fieldNotProvaider(res, "User and Password fields");
      }

      const result = await database.login(user, password);
      if (!result) {
        return res.status(401).send({
          ok: false,
          message: "Invalid credentials",
        });
      }

      // const userId = {
      //   id: result.id,
      //   nome: result.nome,
      //   senha: result.senha,
      // };

      return res.status(200).send({
        ok: true,
        message: "Login successfully done",
        //data: userId,
        data: result,
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing;
    }
  }
}
