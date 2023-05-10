import { Router } from "express";
import { userController } from "../controllers/users.controller";
import { errandsRoutes } from "../../errands/routes/errands.routes";
import { CreateUserValidator } from "../validatores/create-user.validator";
import { LoginUserValidator } from "../validatores/login.validator";

export const userRoutes = () => {
  const app = Router();

  app.post(
    "/createaccount",
    CreateUserValidator.userValidate,
    new userController().createUser
  );

  app.post(
    "/login",
    LoginUserValidator.loginValidator,
    new userController().loginUser
  );

  app.use("/errands", errandsRoutes());

  return app;
};
