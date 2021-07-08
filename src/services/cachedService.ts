import { Request, Response } from "express";

import { CompanyModel } from "../database/schemas/CompanySchema";
import { EmployeeModel } from "../database/schemas/EmployeeSchema";
import { getRealTimeCompanyData } from "./realTimeService";
import { QSA } from "../types/generalTypes";

export async function getCachedCompanyData(req: Request, res: Response): Promise<Response> {
  const { cnpj } = req.query;

  const company = await CompanyModel.findOne({
    cnpj: `${cnpj}`,
  });
  const employee = await EmployeeModel.find({
    cnpj: `${cnpj}`,
  });
  const employeeResult: QSA = {
    qsa: [],
  };


  for (let i = 0; i < employee.length; i++) {
    employeeResult.qsa[i] = employee[i];
  }

  if (!company || !employee) {
    return getRealTimeCompanyData(req, res);
  } else {
    const FormattedJSONResult = {
      company,
      ...employeeResult,
    };

    return res.status(200).json({
      ...FormattedJSONResult,
    });
  }
}
