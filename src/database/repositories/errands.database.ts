import { log } from "console";
import { ErrandsModel } from "../../models/errands.model";
import { DatabaseConnection } from "../config/database.connection";
import { ErrandsEntity } from "../entities/errands.entity";
import { UserModel } from "../../models/user.model";

export class ErrandsDatabase {
  private repository =
    DatabaseConnection.connection.getRepository(ErrandsEntity);
  public async list() {
    const result = await this.repository.find({
      relations: ["users"],
    });
    console.log(result);
    return result.map((item) => ErrandsDatabase.mapEntityToModel(item));
  }
  public async create(id: string, errand: ErrandsModel) {
    const errandsEntity = this.repository.create({
      id: errand.id,
      description: errand.description,
      detailing: errand.detailing,
      idUser: id,
    });

    const result = await this.repository.save(errandsEntity);
    console.log(result);

    return ErrandsDatabase.mapEntityToModel(result);
  }
  static mapEntityToModel(entity: ErrandsEntity): ErrandsModel {
    throw new Error("Method not implemented.");
  }
}
