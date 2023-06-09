import express from "express";
import { userRoutes } from "../../app/features/user/routes/user.routes";
import cors from "cors";

export const createServerApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/user", userRoutes());

  return app;
};
