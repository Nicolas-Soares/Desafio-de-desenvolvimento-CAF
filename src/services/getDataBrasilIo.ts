import axios from "axios";

async function getCompanyData(cnpj: any) {
  const companyDataURL = `https://api.brasil.io/v1/dataset/socios-brasil/empresas/data/?cnpj=${cnpj}`;

  const companyDataResponse = await axios.get(companyDataURL, {
    headers: { Authorization: process.env.BRASIL_IO_API_AUTH_TOKEN },
  });

  return companyDataResponse;
}

async function getPartnerData(cnpj: any) {
  const companyPartnerURL = `https://api.brasil.io/v1/dataset/socios-brasil/socios/data/?cnpj=${cnpj}`;

  const partnerResponse = await axios.get(companyPartnerURL, {
    headers: { Authorization: process.env.BRASIL_IO_API_AUTH_TOKEN },
  });

  return partnerResponse;
}

export { getCompanyData, getPartnerData }