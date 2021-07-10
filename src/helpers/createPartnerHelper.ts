import { PartnerProps } from "../types/generalTypes";

export function CreatePartner(): PartnerProps {
  return {
    cpf_cnpj_socio: '',
    nome_socio: '',
    qualificacao_socio: '',
    tipo_socio: '',
  };
}
