import { Router } from "express";
import { ErrandsController } from "../controllers/errands.controllers";
import { userController } from "../controllers/users.controller";

//import { LoginValidatorMiddleware } from "../middlewares/login-validator-middleware";
import { ValidatorMiddlewarUser } from "../app/shared/middlewares/validator_user.middleware";

export const userRoutes = () => {
  const app = Router();

  // app.post(
  //   "/login",
  //   LoginValidatorMiddleware.loginValidator,
  //   new userController().loginUser
  // );
  // app.delete("/userId/:id/errands/:id", new ErrandsController().delete);
  app.post(
    "/createaccount",
    ValidatorMiddlewarUser.userValidMiddleware,
    new userController().createUser
  );

  app.post("/login", new userController().loginUser);

  app.post("/:userId/errand", new ErrandsController().createErrands);

  app.put("/errandsId/:errandsId/user/:id", new ErrandsController().update);
  app.delete("/errands/:id", new ErrandsController().delete);

  app.get("/:userId/listerrands", new ErrandsController().listErrands);

  return app;
};
