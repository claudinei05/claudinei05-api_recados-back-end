import cors from "cors";
import express from "express";
import { DatabaseConnection } from "../database/typeorm.connection";
import { userRoutes } from "../../routes/user.routes";
import * as dotenv from "dotenv";
import { createServerApp } from "../config/express.config";

dotenv.config();

export class AppServer {
  public static async run() {
    const app = createServerApp();

    DatabaseConnection.connect().then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`API está rodando na porta ${process.env.PORT}`);
      });
    });
  }
}
