type CompanyProps = {
  cnpj?: string;
  razao_social?: string;
  uf?: string;
  qsa?: Array<EmployeeProps>
};

type EmployeeProps = {
  cpf_cnpj_socio?: string;
  nome_socio?: string;
  qualificacao_socio?: string;
  tipo_socio?: string;
};

export { CompanyProps, EmployeeProps }
