import { Request, Response } from "express";
import { ErrorServer } from "../../../shared/erros/server.error";
import { CreateUserUsecase } from "../usecases/create-user.usecase";
import { LoginUserUsecase } from "../usecases/login-user.usecase";

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

      const usecase = new LoginUserUsecase();
      const result = await usecase.execute({
        user,
        password,
      });
      return res.status(result.code).send(result);
    } catch (error: any) {
      return ErrorServer.errorServerProcessing;
    }
  }
}
