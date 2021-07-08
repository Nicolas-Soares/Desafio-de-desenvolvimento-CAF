import { Schema, model, Model } from "mongoose";
import { IEmployee } from "../../interfaces/EmployeeInterface";

const employeeSchema = new Schema({
  cnpj: {
    type: String,
    required: true,
  },
  cpf_cnpj_socio: {
    type: String,
    required: true,
  },
  nome_socio: {
    type: String,
    required: true,
  },
  qualificacao_socio: {
    type: String,
    required: true,
  },
  razao_social: {
    type: String,
    required: true,
  },
  tipo_socio: {
    type: String,
    required: true,
  },
});

const EmployeeModel: Model<IEmployee> = model<IEmployee>("Employee",employeeSchema,"Employee");

export { EmployeeModel, employeeSchema };
