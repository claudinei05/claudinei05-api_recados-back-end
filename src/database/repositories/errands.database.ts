import { ErrandsModel } from "../../models/errands.model";
import { DatabaseConnection } from "../config/database.connection";
import { ErrandsEntity } from "../entities/errands.entity";

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

    return ErrandsDatabase.mapEntityToModel(result);
  }

  public async delete(id: string): Promise<number> {
    const result = await this.repository.delete({
      id,
    });

    return result.affected ?? 0;
  }

  public async updateWithSave(
    id: string,
    description: string,
    detailing: string
  ): Promise<number> {
    const errandsEntity = await this.repository.findOneBy({
      id,
    });

    if (!errandsEntity) {
      return 0;
    }

    errandsEntity.description = description;
    errandsEntity.detailing = detailing;
    await this.repository.save(errandsEntity);

    return 1;
  }

  static mapEntityToModel(entity: ErrandsEntity): ErrandsModel {
    return ErrandsModel.create(entity.id, entity.description, entity.detailing);
  }
}
