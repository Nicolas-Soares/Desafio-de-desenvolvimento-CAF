import axios from "axios";
import { Request, Response } from "express";

import { CompanyModel } from "../database/schemas/CompanySchema";
import { EmployeeModel } from "../database/schemas/EmployeeSchema";
import { IEmployee } from "../interfaces/EmployeeInterface";
import { ICompany } from "../interfaces/CompanyInterface";
import { CreateEmployee } from "../helpers/createEmployeeHelper";
import { CompanyProps, QSA } from "../types/generalTypes";

export async function getRealTimeCompanyData(
  req: Request,
  res: Response
): Promise<Response> {
  const { cnpj } = req.query;
  const CompanyDataURL = `https://api.brasil.io/v1/dataset/socios-brasil/empresas/data/?cnpj=${cnpj}`;
  const CompanyEmployeeURL = `https://api.brasil.io/v1/dataset/socios-brasil/socios/data/?cnpj=${cnpj}`;

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

    item.cnpj = result.cnpj;
    item.cpf_cnpj_socio = result.cpf_cnpj_socio;
    item.nome_socio = result.nome_socio;
    item.qualificacao_socio = result.qualificacao_socio;
    item.razao_social = result.razao_social;
    item.tipo_socio = result.tipo_socio;

    EmployeeResult.qsa?.push(item);
  });

  const FormattedJSONResult = {
    ...CompanyResult,
    ...EmployeeResult,
  };

  //MONGODB -----
  // for (let i = 0; i < EmployeeResult.qsa.length; i++) {
  //   const employee = await EmployeeModel.findOne({
  //     cnpj: '14367312000142',
  //   });

  //   console.log(employee);
  // }

  return res.status(200).json({
    ...EmployeeResult,
  });
}
