import { Router } from "express";
import { ErrandsController } from "../controllers/errands.controllers";
import { CreateErrandsValidator } from "../validatores/create-errands.validator";

export const errandsRoutes = () => {
  const app = Router({ mergeParams: true });

  app.post(
    "/:userId/message",
    CreateErrandsValidator.errandsValidate,
    new ErrandsController().createErrands
  );

  app.put("/:errandsId/user/:id", new ErrandsController().update);
  app.delete("/:id", new ErrandsController().delete);

  app.get("/userId/:userId/listerrands", new ErrandsController().listErrands);

  return app;
};
