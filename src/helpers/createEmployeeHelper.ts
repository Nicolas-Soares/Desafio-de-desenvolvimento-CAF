import { EmployeeProps } from "../types/generalTypes";

export function CreateEmployee(): EmployeeProps {
  return {
    cnpj: null,
    cpf_cnpj_socio: null,
    nome_socio: null,
    qualificacao_socio: null,
    razao_social: null,
    tipo_socio: null,
  };
}
