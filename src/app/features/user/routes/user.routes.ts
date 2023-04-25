import { Router } from "express";
import { ErrandsController } from "../../errands/controllers/errands.controllers";
import { userController } from "../controllers/users.controller";

//import { LoginValidatorMiddleware } from "../middlewares/login-validator-middleware";
import { ValidatorMiddlewarUser } from "../../../shared/middlewares/validator_user.middleware";
import { errandsRoutes } from "../../errands/routes/errands.routes";

export const userRoutes = () => {
  const app = Router();

  app.post(
    "/createaccount",
    ValidatorMiddlewarUser.userValidMiddleware,
    new userController().createUser
  );

  app.post("/login", new userController().loginUser);

  app.use("/errands", errandsRoutes());

  return app;
};
