import { log } from "console";
import { ErrandsModel } from "../../models/errands.model";
import { DatabaseConnection } from "../config/database.connection";
import { ErrandsEntity } from "../entities/errands.entity";
import { UserModel } from "../../models/user.model";

export class ErrandsDatabase {
  private repository =
    DatabaseConnection.connection.getRepository(ErrandsEntity);
  public async list(id: string) {
    const result = await this.repository.find({
      where: {
        user: {
          id: id,
        },
      },
      //relations: ["user"],
    });
    // console.log(result);
    return result.map((item) =>
      ErrandsDatabase.mapEntityToModel(item).toJson()
    );
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
  public async deleteErrands(id: string) {
    const result = await this.repository.delete({
      id,
    });
  }

  public async editErrands(id: string) {}

  static mapEntityToModel(entity: ErrandsEntity): ErrandsModel {
    return ErrandsModel.create(entity.id, entity.description, entity.detailing);
  }
}
