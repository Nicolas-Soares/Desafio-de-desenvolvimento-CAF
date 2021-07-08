import { CompanyProps } from "../types/generalTypes";

export function CreateCompany(): CompanyProps {
  return {
    cnpj: undefined,
    razao_social: undefined,
    uf: undefined,
  };
}
