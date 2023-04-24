import { DataSource } from "typeorm";
import config from "../config/typeorm.config";

export class DatabaseConnection {
  private static _connection: DataSource;

  public static async connect() {
    this._connection = await config.initialize();
    console.log("Database connected");
  }

  public static get connection() {
    if (!this._connection) {
      throw new Error("DB not connected");
    }

    return this._connection;
  }
}
