import { UserModel } from "../../models/user.model";
import { DatabaseConnection } from "../config/database.connection";
import { UserEntity } from "../entities/user.entity";

import { users } from "../user";
import { ErrandsDatabase } from "./errands.database";

export class UserDataBase {
  private repository = DatabaseConnection.connection.getRepository(UserEntity);

  // public async list(usuario: string): Promise<UserModel[]> {
  //   const result = await this.repository.find({
  //     where: {
  //       usuario,
  //     },
  //     relations: ["errends"],
  //   });
  //   return result.map((user: any) => this.mapEntityToModel(user));
  // }

  private mapEntityToModel(entity: UserEntity): UserModel {
    const errandsEntity = entity.errands ?? [];

    const errands = errandsEntity.map((item) =>
      ErrandsDatabase.mapEntityToModel(item)
    );
    return UserModel.create(
      entity.id.trim(),
      entity.nome,
      entity.usuario,
      entity.senha,
      "indefinido",
      errands
    );
  }

  public async create(user: UserModel) {
    const userEntity = this.repository.create({
      id: user.id,
      nome: user.name,
      usuario: user.user,
      senha: user.password,
    });
    const result = await this.repository.save(userEntity);
    console.log(result);

    return this.mapEntityToModel(result);
  }
  //   public async createWithId(growdever: UserModel) {
  //     let query = `insert into growdevers.growdever `;
  //     query += `(id, nome, cpf, idade, nota, ind_ativo, dt_nascimento) `;
  //     query += `values `;
  //     query += `('${growdever.id}', '${growdever.nome}', ${growdever.cpf}, ${growdever.idade}, 8, true, '1980-11-20') `;

  //     await DatabaseConnection.connection.query(query);
  // }

  public async getID(id: string) {
    const result = await this.repository.findOneBy({
      id,
    });

    if (!result) {
      return null;
    }
    return this.mapEntityToModel(result);
  }
  public getId(id: string) {
    return users.find((user) => user.id === id);
  }
  public get(id: string) {
    return users.find((user) => user.id === id);
  }

  // public create(usuario: UserModel) {
  //   return users.push(usuario);
  // }
  // public getUser(user: string) {
  //   return users.find((users) => users.user === user);
  // }
  public getUser(user: string) {
    return users.find((users) => users.user === user);
  }
  public indexUser(id: string) {
    return users.findIndex((user) => user.id === id);
  }

  public deleteErrands(index: number) {
    return users.splice(index, 1);
  }
}
