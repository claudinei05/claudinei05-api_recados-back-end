import { Request, Response } from "express";
// import {  UserRepository } from "../repositores/user.repository";
import { ErrorServer } from "../../../shared/erros/server.error";
import { UserModel } from "../../../models/user.model";
import { SuccessResponse } from "../../../shared/util/success";
import { UserRepository } from "../repositores/user.repository";
import { CreateUserUsecase } from "../usecases/create-user";

export class userController {
  public async createUser(req: Request, res: Response) {
    try {
      const { name, user, password, confirmPassword } = req.body;

      const usecase = new CreateUserUsecase();
      const result = await usecase.execute({
        name,
        user,
        password,
        confirmPassword,
      });
      return res.status(result.code).send(result);
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }

  public async loginUser(req: Request, res: Response) {
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

      return res.status(200).send({
        ok: true,
        message: "Login successfully done (Login feito com sucesso)",
        data: result,
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing;
    }
  }
}
