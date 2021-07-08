import { Document } from "mongoose";

export interface ICompany extends Document {
  cnpj?: string;
  razao_social?: string;
  uf?: string;
}
