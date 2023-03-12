import { Router } from "express";
import { ErrandsController } from "../controllers/errands.controllers";
import { userController } from "../controllers/users.controller";
import { LoginValidatorMiddleware } from "../middlewares/login-validator-middleware";
import { ValidatorMiddlewarUser } from "../middlewares/validator_user.middleware";

export const userRoutes = () => {
  const app = Router();
  app.post(
    "/createaccount",
    ValidatorMiddlewarUser.userValidMiddleware,
    new userController().createUser
  );
  app.post(
    "/login",
    LoginValidatorMiddleware.loginValidator,
    new userController().loginUser
  );
  app.post("/:userId/errand", new ErrandsController().createErrands);
  app.put("/errands/:userId/note/:id", new ErrandsController().edit);
  app.delete("/errands/:userId/note/:id", new ErrandsController().delete);
  app.get("/:userId/listerrands", new ErrandsController().listErrands);
  return app;
};
