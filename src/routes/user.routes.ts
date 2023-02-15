import { Router } from "express";
import { userController } from "../controllers/users.controller";

import { ValidatorMiddlewareCpf } from "../middlewares/validator_cpf.middleware";

export const userRoutes = () => {
  const app = Router();
  app.post("/criarconta", new userController().createUser);
  return app;
};
