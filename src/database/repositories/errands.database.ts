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

  public async editErrands(
    id: string,
    description: string,
    detailing: string
  ): Promise<any> {
    const result = await this.repository.update(
      { id },
      { description: description, detailing: detailing }
    );
    return result;
  }
  public async getID(id: string) {
    const result = await this.repository.findOneBy({ id });

    if (!result) {
      return 0;
    }

    return result;
  }
  // public async updateWithSave(
  //   id: string,
  //   description: string
  // ): Promise<number> {
  //   const errandsEntity = await this.repository.findOneBy({
  //     id,
  //   });

  //   if (!errandsEntity) {
  //     return 0;
  //   }

  //   errandsEntity.description = description;
  //   await this.repository.save(errandsEntity);

  //   return 1;
  // }

  static mapEntityToModel(entity: ErrandsEntity): ErrandsModel {
    return ErrandsModel.create(entity.id, entity.description, entity.detailing);
  }
}
