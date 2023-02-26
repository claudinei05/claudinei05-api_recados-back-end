import { Router } from "express";
import { ErrandsController } from "../controllers/errands.controllers";
import { userController } from "../controllers/users.controller";

//import { ValidatorMiddlewareCpf } from "../middlewares/validator_cpf.middleware";

export const userRoutes = () => {
  const app = Router();
  app.post("/createaccount", new userController().createUser);
  app.post("/login", new userController().loginUser);
  app.post("/:userId/errand", new ErrandsController().createErrands);
  app.put("/errands/:userId/note/:id", new ErrandsController().edit);
  app.delete("/errands/:userId/note/:id", new ErrandsController().delete);
  app.get("/:userId/listerrands", new ErrandsController().listErrands);
  return app;
};
