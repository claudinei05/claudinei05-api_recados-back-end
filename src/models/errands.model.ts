import { v4 as createUuid } from "uuid";
export class ErrandsModel {
  private _id: string;
  constructor(private _description: string, private _detailing: string) {
    this._id = createUuid();
  }
  public get id() {
    return this._id;
  }
  public get description() {
    return this._description;
  }
  public set description(description: string) {
    this._description = description;
  }

  public get detailing() {
    return this._detailing;
  }
  public set detailing(detailing: string) {
    this._detailing = detailing;
  }
  public toJson() {
    return {
      description: this._description,
      detailing: this._detailing,
      id: this._id,
    };
  }
}
