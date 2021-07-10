import { Request, Response } from "express";
import { AxiosResponse } from "axios";

import { CompanyModel } from "../database/schemas/CompanySchema";
import { CreatePartner } from "../helpers/createPartnerHelper";
import { CompanyProps } from "../types/generalTypes";
import { getCompanyData, getPartnerData } from "../services/getDataBrasilIo";

function insertPartnerDataIntoCompanyQSA(companyResult: CompanyProps, partnerResponse: AxiosResponse<any>) {
  partnerResponse.data.results.forEach((result: any) => {
    const item = CreatePartner();

    item.cpf_cnpj_socio = result.cpf_cnpj_socio;
    item.nome_socio = result.nome_socio;
    item.qualificacao_socio = result.qualificacao_socio;
    item.tipo_socio = result.tipo_socio;

    companyResult.qsa?.push(item);
  });
}

async function updateCompanyData(company: CompanyProps) {
  const companyToBeUpdatedOnDatabase = await CompanyModel.findOneAndUpdate(
    {
      cnpj: `${company.cnpj}`,
    },
    {
      razao_social: `${company.razao_social}`,
      uf: `${company.uf}`,
      qsa: company.qsa,
    }
  );

  if (!companyToBeUpdatedOnDatabase) {
    const newCompany = new CompanyModel({
      cnpj: `${company.cnpj}`,
      razao_social: `${company.razao_social}`,
      uf: `${company.uf}`,
      qsa: company.qsa,
    });
    newCompany.save();
  }
}

export async function getRealTimeCompanyData(req: Request,res: Response): Promise<Response> {
  const { cnpj }: any = req.query;
  
  if (cnpj.length > 14 || cnpj.length < 14) {
    return res.status(400).json({
      error: '400 Bad Request',
      message: 'Informed CNPJ is too long/short'
    })
  }

  const companyDataResponse = await getCompanyData(cnpj)
  const partnerResponse = await getPartnerData(cnpj)
  
  if (!companyDataResponse.data.count || !partnerResponse.data.count) {
    return res.status(404).json({
      error: "404 Not Found",
      message: 'No company with this CNPJ found on Brasil.io'
    });
  }

  const companyResult: CompanyProps = {
    cnpj: companyDataResponse.data.results[0].cnpj,
    razao_social: companyDataResponse.data.results[0].razao_social,
    uf: companyDataResponse.data.results[0].uf,
    qsa: [],
  };

  insertPartnerDataIntoCompanyQSA(companyResult, partnerResponse)
  await updateCompanyData(companyResult)

  return res.status(200).json({
    ...companyResult,
  });
}
