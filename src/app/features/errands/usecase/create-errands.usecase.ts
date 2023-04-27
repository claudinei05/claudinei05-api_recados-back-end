import { ErrandsModel } from "../../../models/errands.model";
import { Return } from "../../../shared/util/usecase.return";
import { GetUserRepositoryContract } from "../../user/util/user-repository.contract";
import { ErrandsRepositoryContract } from "../util/errands-repository.contract";

interface CreateErrandsParams {
  userId: string;
  description: string;
  detailing: string;
}

export class CreateErrandsUsecase {
  constructor(
    private userDatabase: GetUserRepositoryContract,
    private errandsDatabase: ErrandsRepositoryContract
  ) {}

  public async execute(data: CreateErrandsParams): Promise<Return> {
    const resultUser = await this.userDatabase.getID(data.userId);

    if (!resultUser) {
      return {
        ok: false,
        message: " User not found(Usuario não encontrado)",
        code: 404,
      };
    }

    const result = await this.errandsDatabase.create(
      data.userId,
      new ErrandsModel(data.description, data.detailing)
    );

    return {
      ok: true,
      data: result,
      message: "Errands success created (Recados criados com sucesso)",
      code: 201,
    };
  }
}
