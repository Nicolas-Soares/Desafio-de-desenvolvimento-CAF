import { EmployeeProps } from "../types/generalTypes";

export function CreateEmployee(): EmployeeProps {
  return {
    cnpj: undefined,
    cpf_cnpj_socio: undefined,
    nome_socio: undefined,
    qualificacao_socio: undefined,
    razao_social: undefined,
    tipo_socio: undefined,
  };
}
