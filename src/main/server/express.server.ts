import cors from "cors";
import express from "express";
import { DatabaseConnection } from "../database/typeorm.connection";
import { userRoutes } from "../../app/features/user/routes/user.routes";
import { createServerApp } from "../config/express.config";
import { serverEnv } from "../../app/envs/server.env";

export class AppServer {
  public static async run() {
    const app = createServerApp();

    DatabaseConnection.connect().then(() => {
      app.listen(serverEnv.port, () => {
        console.log(`API está rodando na porta ${process.env.PORT}`);
      });
    });
  }
}
