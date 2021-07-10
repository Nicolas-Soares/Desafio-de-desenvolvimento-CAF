import { Request, Response } from "express";

import { CompanyModel } from "../database/schemas/CompanySchema";
import { getRealTimeCompanyData } from "./realTimeController";
import { CompanyProps } from "../types/generalTypes";

async function findCompanyOnDatabase(cnpj: any) {
  return await CompanyModel.findOne(
    {cnpj: `${cnpj}`},
    `
      cnpj
      razao_social
      uf
      qsa.cpf_cnpj_socio
      qsa.nome_socio
      qsa.qualificacao_socio
      qsa.tipo_socio
    `
  )
}

export async function getCachedCompanyData(req: Request,res: Response): Promise<Response> {
  const { cnpj }: any = req.query;

  if (cnpj.length > 14 || cnpj.length < 14) {
    return res.status(400).json({
      error: '400 Bad Request',
      message: 'Informed CNPJ is too long/short'
    })
  }
  
  const company = await findCompanyOnDatabase(cnpj);

  const companyResult: CompanyProps = {
    cnpj: company?.cnpj,
    razao_social: company?.razao_social,
    uf: company?.uf,
    qsa: company?.qsa,
  };

  if (!company) {
    return getRealTimeCompanyData(req, res);
  } else {
    return res.status(200).json({
      ...companyResult,
    });
  }
}
