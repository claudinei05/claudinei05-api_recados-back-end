import { v4 as createUuid } from "uuid";
import { RecadosModel } from "./recado.model";
export class UserModel {
  private _id: string;
  private _recados: RecadosModel[];
  constructor(
    private _name: string,
    private _user: string,
    private _password: string,
    private _confirmPassword: string
  ) {
    this._id = createUuid();
    this._recados = [];
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
  public get recados() {
    return this._recados;
  }
  public set recados(recados: RecadosModel[]) {
    this._recados = recados;
  }

  public toJson() {
    return {
      id: this._id,
      name: this._name,
      user: this._user,
      password: this._password,
      confirmPassword: this._confirmPassword,
      recados: this.recados,
    };
  }
}
