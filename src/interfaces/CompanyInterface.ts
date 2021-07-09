import { Document } from "mongoose";
import { EmployeeProps} from "../types/generalTypes";

export interface ICompany extends Document {
  cnpj?: string;
  razao_social?: string;
  uf?: string;
  qsa?: Array<EmployeeProps>;
}
