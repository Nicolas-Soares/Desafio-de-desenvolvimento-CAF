import { Schema, model, Model } from "mongoose";
import { ICompany } from "../../interfaces/CompanyInterface";

const companySchema: Schema = new Schema({
  cnpj: {
    type: String,
    required: true,
  },
  razao_social: {
    type: String,
    required: true,
  },
  uf: {
    type: String,
    required: true,
  },
  qsa: [
    {
      cpf_cnpj_socio:{ type: String, required: true },
      nome_socio:{ type: String, required: true },
      qualificacao_socio:{ type: String, required: true },
      tipo_socio:{ type: String, required: true }
    }
  ]
});

const CompanyModel: Model<ICompany> = model<ICompany>("Company",companySchema,"Company");

export { CompanyModel, companySchema };
