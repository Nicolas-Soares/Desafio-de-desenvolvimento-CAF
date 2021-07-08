import { Request, Response } from "express";

import { CompanyModel } from "../database/schemas/CompanySchema";
import { EmployeeModel } from "../database/schemas/EmployeeSchema";

import { getRealTimeCompanyData } from "./realTimeService";

export async function getCachedCompanyData(
  req: Request,
  res: Response
): Promise<any> {
  const { cnpj } = req.query;

  // const result = await Employee.find({})

  // console.log(result)
  //return res.json(result)

  //   const myEmployee = new Employee({
  //     cnpj: '***776380**',
  //     cpf_cnpj_socio: '14367312000142',
  //     nome_socio: 'PEDRO',
  //     qualificacao_socio: 'AC',
  //     razao_social: '1 IGREJA BATISTA DA FLORESTA',
  //     tipo_socio: 'PJ'
  // })
  //   myEmployee.save()

  const company = await CompanyModel.findOne({
    cnpj: `${cnpj}`,
  });
  const employee = await EmployeeModel.find({
    cnpj: `${cnpj}`,
  });
  console.log(company);

  if (!company || !employee) {
    return getRealTimeCompanyData(req, res);
  } else {
    return res.status(200).json({
      message: "Found on local database",
    });
  }
}
