import { Document } from "mongoose";

export interface IEmployee extends Document {
  cnpj?: string;
  cpf_cnpj_socio?: string;
  nome_socio?: string;
  qualificacao_socio?: string;
  razao_social?: string;
  tipo_socio?: string;
}
