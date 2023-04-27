import { ErrandsModel } from "../../../models/errands.model";

export interface ErrandsRepositoryContract {
  create: (id: string, errand: ErrandsModel) => Promise<ErrandsModel>;
}
