type CompanyProps = {
  cnpj?: string;
  razao_social?: string;
  uf?: string;
};

type QSA = {
  qsa: Array<EmployeeProps>;
};

type EmployeeProps = {
  cnpj?: string;
  cpf_cnpj_socio?: string;
  nome_socio?: string;
  qualificacao_socio?: string;
  razao_social?: string;
  tipo_socio?: string;
};

export { CompanyProps, QSA, EmployeeProps }
