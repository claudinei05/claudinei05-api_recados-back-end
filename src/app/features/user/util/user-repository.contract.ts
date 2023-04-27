import { UserModel } from "../../../models/user.model";

export interface GetUserRepositoryContract {
  getID: (id: string) => Promise<UserModel | null>;
}
