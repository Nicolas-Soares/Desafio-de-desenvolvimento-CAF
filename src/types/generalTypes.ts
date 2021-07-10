type CompanyProps = {
  cnpj?: string;
  razao_social?: string;
  uf?: string;
  qsa?: Array<PartnerProps>
};

type PartnerProps = {
  cpf_cnpj_socio?: string;
  nome_socio?: string;
  qualificacao_socio?: string;
  tipo_socio?: string;
};

export { CompanyProps, PartnerProps }
