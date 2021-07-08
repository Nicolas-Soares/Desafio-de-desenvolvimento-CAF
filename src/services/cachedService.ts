import { Request, Response } from "express";

import { CompanyModel } from "../database/schemas/CompanySchema";
import { EmployeeModel } from "../database/schemas/EmployeeSchema";
import { getRealTimeCompanyData } from "./realTimeService";
import { QSA, CompanyProps } from "../types/generalTypes";

export async function getCachedCompanyData(req: Request, res: Response): Promise<Response> {
  const { cnpj } = req.query;

  //SEARCH FOR ITEM ON DATABASE -----
  const company = await CompanyModel.findOne({
    cnpj: `${cnpj}`,
  });
  const employee = await EmployeeModel.find({
    cnpj: `${cnpj}`,
  });

  //FIT VARIABLE TYPES -----
  const companyResult: CompanyProps = {
    cnpj: company?.cnpj,
    razao_social: company?.razao_social,
    uf: company?.uf 
  }
  const employeeResult: QSA = {
    qsa: [],
  };

  for (let i = 0; i < employee.length; i++) {
    employeeResult.qsa[i] = employee[i];
  }

  //CHECK IF COMPANY EXISTS ON DATABASE, OTHERWISE SEARCH FOR IT ON BRASIL.IO -----
  if (!company) {
    return getRealTimeCompanyData(req, res);
  } else {
    const formattedJSONResult = {
      ...companyResult,
      ...employeeResult,
    };

    return res.status(200).json({
      ...formattedJSONResult,
    });
  }
}
