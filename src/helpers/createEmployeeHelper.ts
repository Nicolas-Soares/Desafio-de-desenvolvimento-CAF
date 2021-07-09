import { EmployeeProps } from "../types/generalTypes";

export function CreateEmployee(): EmployeeProps {
  return {
    cpf_cnpj_socio: '',
    nome_socio: '',
    qualificacao_socio: '',
    tipo_socio: '',
  };
}
