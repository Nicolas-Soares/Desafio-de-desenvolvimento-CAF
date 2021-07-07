import axios from "axios";
import { Request, Response } from "express";

type CompanyProps = {
  cnpj: string;
  razao_social: string;
  uf: string;
};

type QSA = {
  qsa: Array<Object>;
};

type EmployeeProps = {
  cpf_cnpj_socio: string | null;
  nome_socio: string | null;
  qualificacao_socio: string | null;
  tipo_socio: string | null;
};

export async function getCompanyData(req: Request,res: Response): Promise<any> {
  function CreateEmployee(): EmployeeProps {
    return {
      cpf_cnpj_socio: null,
      nome_socio: null,
      qualificacao_socio: null,
      tipo_socio: null,
    };
  }

  const { cnpj } = req.query;
  const CompanyDataURL = `https://api.brasil.io/v1/dataset/socios-brasil/empresas/data/?cnpj=${cnpj}`;
  const CompanyEmployeeURL = `https://api.brasil.io/v1/dataset/socios-brasil/socios/data/?cnpj=${cnpj}`;

  //AXIOS RESPONSES -----
  const CompanyDataResponse = await axios.get(CompanyDataURL, {
    headers: {
      Authorization: process.env.BRASIL_IO_API_AUTH_TOKEN,
    },
  });
  const EmployeeResponse = await axios.get(CompanyEmployeeURL, {
    headers: {
      Authorization: process.env.BRASIL_IO_API_AUTH_TOKEN,
    },
  });

  if (!CompanyDataResponse.data.count || !EmployeeResponse.data.count) {
    return res.status(404).json({
      message: "404 Not Found",
    });
  }

  const CompanyResult: CompanyProps = {
    cnpj: CompanyDataResponse.data.results[0].cnpj,
    razao_social: CompanyDataResponse.data.results[0].razao_social,
    uf: CompanyDataResponse.data.results[0].uf,
  };
  const EmployeeResult: QSA = {
    qsa: [],
  };

  EmployeeResponse.data.results.forEach((result: any) => {
    const item = CreateEmployee();

    item.cpf_cnpj_socio = result.cpf_cnpj_socio;
    item.nome_socio = result.nome_socio;
    item.qualificacao_socio = result.qualificacao_socio;
    item.tipo_socio = result.tipo_socio;

    EmployeeResult.qsa?.push(item);
  });

  const FormattedJSONResult = {
    ...CompanyResult,
    ...EmployeeResult,
  };

  return res.status(200).json(FormattedJSONResult);
}
