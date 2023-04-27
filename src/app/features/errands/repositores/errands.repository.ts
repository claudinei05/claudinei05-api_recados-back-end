import { ErrandsModel } from "../../../models/errands.model";
import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { ErrandsEntity } from "../../../shared/database/entities/errands.entity";
import { ErrandsRepositoryContract } from "../util/errands-repository.contract";

export class ErrandsRepository implements ErrandsRepositoryContract {
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
      ErrandsRepository.mapEntityToModel(item).toJson()
    );
  }
  public async create(id: string, errand: ErrandsModel) {
    const errandsEntity = this.repository.create({
      id: errand.id,
      description: errand.description,
      detailing: errand.detailing,
      idUser: id,
      dthrCriacao: new Date(),
    });

    const result = await this.repository.save(errandsEntity);

    return ErrandsRepository.mapEntityToModel(result);
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
