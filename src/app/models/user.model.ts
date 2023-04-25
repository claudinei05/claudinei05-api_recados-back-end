import { v4 as createUuid } from "uuid";
import { ErrandsModel } from "./errands.model";
import { UserEntity } from "../shared/database/entities/user.entity";

export class UserModel {
  private _id: string;
  private _errands: ErrandsModel[];
  constructor(
    private _name: string,
    private _user: string,
    private _password: string,
    private _confirmPassword: string
  ) {
    this._id = createUuid();
    this._errands = [];
  }
  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }
  public get user() {
    return this._user;
  }
  public set user(user: string) {
    this._user = user;
  }
  public get password() {
    return this._password;
  }
  public set password(password: string) {
    this._password = password;
  }
  public get confirmPassword() {
    return this._confirmPassword;
  }
  public set confirmPassword(confPassword: string) {
    this._confirmPassword = confPassword;
  }
  public get errands() {
    return this._errands;
  }
  public set errands(errands: ErrandsModel[]) {
    this._errands = errands;
  }

  public toJson() {
    return {
      id: this._id,
      name: this._name,
      user: this._user,
      password: this._password,
      confirmPassword: this._confirmPassword,
      errands: this._errands,
    };
  }

  public static createModels(
    id: string,
    name: string,
    user: string,
    password: string,
    confirmPassword: string,
    errands?: ErrandsModel[]
  ) {
    const users = new UserModel(name, user, password, confirmPassword);
    users._id = id;
    return users;
  }
}
