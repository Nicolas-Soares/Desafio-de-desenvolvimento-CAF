import axios from "axios";
import { Request, Response } from "express";

const CompanyDataURL =
  "https://api.brasil.io/v1/dataset/socios-brasil/empresas/data/?cnpj=";
const CompanyEmployeeURL =
  "https://api.brasil.io/v1/dataset/socios-brasil/socios/data/?cnpj=";

export async function getCompanyData(
  req: Request,
  res: Response
): Promise<any> {
  const { cnpj } = req.query;
  const url = `${CompanyDataURL}${cnpj}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: process.env.BRASIL_IO_API_AUTH_TOKEN,
    },
  });

  if (!response.data.count) {
    return res.status(404).json({
      message: "404 Not Found",
    });
  }

  return res.json(response.data);
}
