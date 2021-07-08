type CompanyProps = {
  cnpj: string;
  razao_social: string;
  uf: string;
};

type QSA = {
  qsa: Array<Object>;
};

type EmployeeProps = {
  cnpj: string | null;
  cpf_cnpj_socio: string | null;
  nome_socio: string | null;
  qualificacao_socio: string | null;
  razao_social: string | null;
  tipo_socio: string | null;
};

export { CompanyProps, QSA, EmployeeProps }
