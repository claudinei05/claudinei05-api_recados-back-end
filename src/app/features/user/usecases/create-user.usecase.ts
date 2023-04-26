import { Request, Response } from "express";
import { UserModel } from "../../../models/user.model";
import { UserRepository } from "../repositores/user.repository";
import { Return } from "../../../shared/util/usecase.return";

interface CreateUserParams {
  name: string;
  user: string;
  password: string;
  confirmPassword: string;
}

export class CreateUserUsecase {
  public async execute(data: CreateUserParams): Promise<Return> {
    if (
      data.name === "" ||
      data.user === "" ||
      data.password === "" ||
      data.confirmPassword === ""
    ) {
      return {
        ok: false,
        message: "Fill in the fields (preencha os campos)",
        code: 400,
      };
    }
    if (data.password.length < 5 || data.confirmPassword.length < 5) {
      return {
        ok: false,
        message:
          " Password needs at least 5 characters (A senha precisa de pelo menos 5 caracteres)",
        code: 404,
      };
    }
    if (data.user.length < 5) {
      return {
        ok: false,
        message:
          " The user needs at least 5 characters (O usuário precisa de pelo menos 5 caracteres)",
        code: 404,
      };
    }

    if (data.password !== data.confirmPassword) {
      return {
        ok: false,
        message: " Password does not match(Senha não confere)",
        code: 404,
      };
    }

    const newUser = new UserModel(
      data.name,
      data.user,
      data.password,
      data.confirmPassword
    );
    const database = new UserRepository();

    const result = await database.createDatabase(newUser);
    return {
      ok: true,
      data: result,
      message: "User was successfully created",
      code: 201,
    };
  }
}
