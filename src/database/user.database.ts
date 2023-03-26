import { UserModel } from "../models/user.model";

import { users } from "./user";

export class UserDataBase {
  public list() {
    return [...users];
  }
  public getId(id: string) {
    return users.find((user) => user.id === id);
  }
  public get(id: string) {
    return users.find((user) => user.id === id);
  }

  public create(usuario: UserModel) {
    return users.push(usuario);
  }
  public getUser(user: string) {
    return users.find((users) => users.user === user);
  }
  public indexUser(id: string) {
    return users.findIndex((user) => user.id === id);
  }

  public deleteErrands(index: number) {
    return users.splice(index, 1);
  }
  public deleteErrand(index: number) {
    return users.splice(index, 2);
  }
}
