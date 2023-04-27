import { UserRepository } from "../../user/repositores/user.repository";
import { ErrandsRepository } from "../repositores/errands.repository";
import { CreateErrandsUsecase } from "../usecase/create-errands.usecase";

export const createErrandsUsecaseFactory = () => {
  const userDb = new UserRepository();
  const database = new ErrandsRepository();
  return new CreateErrandsUsecase(userDb, database);
};
