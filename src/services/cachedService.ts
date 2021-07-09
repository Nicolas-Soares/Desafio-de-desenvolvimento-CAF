import { Request, Response } from "express";

import { CompanyModel } from "../database/schemas/CompanySchema";
import { getRealTimeCompanyData } from "./realTimeService";
import { CompanyProps } from "../types/generalTypes";

export async function getCachedCompanyData(req: Request,res: Response): Promise<Response> {
  const { cnpj }: any = req.query;

  //SEARCH FOR ITEM ON DATABASE -----
  const company = await CompanyModel.findOne(
    {cnpj: `${cnpj}`},
    `
      cnpj razao_social uf qsa.cpf_cnpj_socio qsa.nome_socio qsa.qualificacao_socio qsa.tipo_socio
    `
  );

  //FIT VARIABLE TYPES -----
  const companyResult: CompanyProps = {
    cnpj: company?.cnpj,
    razao_social: company?.razao_social,
    uf: company?.uf,
    qsa: company?.qsa,
  };

  //CHECK IF COMPANY EXISTS ON DATABASE, OTHERWISE SEARCH FOR IT ON BRASIL.IO -----
  if (!company) {
    return getRealTimeCompanyData(req, res);
  } else {
    return res.status(200).json({
      ...companyResult,
    });
  }
}
