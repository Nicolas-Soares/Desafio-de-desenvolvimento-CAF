import axios from "axios";
import { Request, Response } from "express";

import { CompanyModel } from "../database/schemas/CompanySchema";
import { EmployeeModel } from "../database/schemas/EmployeeSchema";
import { CreateEmployee } from "../helpers/createEmployeeHelper";
import { CompanyProps, QSA } from "../types/generalTypes";

export async function getRealTimeCompanyData(req: Request, res: Response): Promise<Response> {
  const { cnpj }: any = req.query;
  const companyDataURL = `https://api.brasil.io/v1/dataset/socios-brasil/empresas/data/?cnpj=${cnpj}`;
  const companyEmployeeURL = `https://api.brasil.io/v1/dataset/socios-brasil/socios/data/?cnpj=${cnpj}`;

  //GET DATA FROM BRASIL.IO -----
  const companyDataResponse = await axios.get(companyDataURL, {
    headers: {
      Authorization: process.env.BRASIL_IO_API_AUTH_TOKEN,
    },
  });
  const employeeResponse = await axios.get(companyEmployeeURL, {
    headers: {
      Authorization: process.env.BRASIL_IO_API_AUTH_TOKEN,
    },
  });

  //CHECK IF AXIOS GOT A RESPONSE -----
  if (!companyDataResponse.data.count || !employeeResponse.data.count) {
    return res.status(404).json({
      message: "404 Not Found",
    });
  }

  //FIT VARIABLE TYPES -----
  const companyResult: CompanyProps = {
    cnpj: companyDataResponse.data.results[0].cnpj,
    razao_social: companyDataResponse.data.results[0].razao_social,
    uf: companyDataResponse.data.results[0].uf,
  };
  const employeeResult: QSA = {
    qsa: [],
  };

  employeeResponse.data.results.forEach((result: any) => {
    const item = CreateEmployee();

    item.cnpj = result.cnpj;
    item.cpf_cnpj_socio = result.cpf_cnpj_socio;
    item.nome_socio = result.nome_socio;
    item.qualificacao_socio = result.qualificacao_socio;
    item.razao_social = result.razao_social;
    item.tipo_socio = result.tipo_socio;

    employeeResult.qsa?.push(item);
  });

  //UPDATE COMPANY DATA -----
  const companyToBeUpdatedOnDatabase = await CompanyModel.findOneAndUpdate(
    {
      cnpj: `${companyResult.cnpj}`,
    },
    {
      razao_social: `${companyResult.razao_social}`,
      uf: `${companyResult.uf}`,
    }
  );

  if (!companyToBeUpdatedOnDatabase) {
    const newCompany = new CompanyModel({
      cnpj: `${companyResult.cnpj}`,
      razao_social: `${companyResult.razao_social}`,
      uf: `${companyResult.uf}`,
    });
    newCompany.save();
  }

  //UPDATE EMPLOYEE DATA -----
  for (let i = 0; i < employeeResult.qsa.length; i++) {
    const employeeToBeUpdatedOnDatabase = await EmployeeModel.findOneAndUpdate(
      {
        cnpj: `${employeeResult.qsa[i].cnpj}`,
        cpf_cnpj_socio: `${employeeResult.qsa[i].cpf_cnpj_socio}`
      },
      {
        cpf_cnpj_socio: `${employeeResult.qsa[i].cpf_cnpj_socio}`,
        nome_socio: `${employeeResult.qsa[i].nome_socio}`,
        qualificacao_socio: `${employeeResult.qsa[i].qualificacao_socio}`,
        razao_social: `${employeeResult.qsa[i].razao_social}`,
        tipo_socio: `${employeeResult.qsa[i].tipo_socio}`,
      }
    );

    if (!employeeToBeUpdatedOnDatabase) {
      const newEmployee = new EmployeeModel({
        cnpj: `${employeeResult.qsa[i].cnpj}`,
        cpf_cnpj_socio: `${employeeResult.qsa[i].cpf_cnpj_socio}`,
        nome_socio: `${employeeResult.qsa[i].nome_socio}`,
        qualificacao_socio: `${employeeResult.qsa[i].qualificacao_socio}`,
        razao_social: `${employeeResult.qsa[i].razao_social}`,
        tipo_socio: `${employeeResult.qsa[i].tipo_socio}`,
      });

      newEmployee.save();
    }
  }

  //FORMAT AND SHOW RESULTS -----
  const formattedJSONResult = {
    ...companyResult,
    ...employeeResult,
  };

  return res.status(200).json({
    ...formattedJSONResult,
  });
}
