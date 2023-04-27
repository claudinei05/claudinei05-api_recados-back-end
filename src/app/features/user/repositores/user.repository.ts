import { UserModel } from "../../../models/user.model";
import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { UserEntity } from "../../../shared/database/entities/user.entity";
import { ErrandsRepository } from "../../errands/repositores/errands.repository";
import { GetUserRepositoryContract } from "../util/user-repository.contract";

export class UserRepository implements GetUserRepositoryContract {
  private repository = DatabaseConnection.connection.getRepository(UserEntity);

  private mapEntityToModel(entity: UserEntity): UserModel {
    const errandsEntity = entity.errands ?? [];

    const errands = errandsEntity.map((item) =>
      ErrandsRepository.mapEntityToModel(item)
    );

    return UserModel.createModels(
      entity.id.trim(),
      entity.nome,
      entity.usuario,
      entity.senha,
      entity.confirmPassword,
      errands
    );
  }

  public async createDatabase(user: UserModel) {
    const userEntity = this.repository.create({
      id: user.id,
      nome: user.name,
      usuario: user.user,
      senha: user.password,
      confirmPassword: user.confirmPassword,
      // dthrCriacao: new Date(),
    });

    const result = await this.repository.save(userEntity);

    return this.mapEntityToModel(result).toJson();
  }

  public async getID(id: string) {
    const result = await this.repository.findOneBy({
      id,
    });

    if (result === null) {
      return null;
    }
    return this.mapEntityToModel(result);
  }
  public async getUser(usuario: string) {
    const result = await this.repository.findOne({
      where: { usuario },
    });
    return result;
  }
  public async login(user: string, password: string): Promise<any> {
    const result = await this.repository.findOne({
      where: {
        usuario: user,
        senha: password,
      },
    });

    return result;
  }
}
