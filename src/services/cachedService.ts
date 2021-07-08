import { Request, Response } from "express";
import { Company } from "../database/schemas/CompanySchema";
import { Employee } from "../database/schemas/EmployeeSchema";

// const myEmployee = new Employee({
//     cpf_cnpj_socio: '14367312000142',
//     nome_socio: '1 IGREJA BATISTA DA FLORESTA',
//     qualificacao_socio: 'AC',
//     tipo_socio: 'PJ'
// })
// myEmployee.save()

export async function getCachedCompanyData(
  req: Request,
  res: Response
): Promise<any> {
  const { cnpj } = req.query;
    
  const result = await Employee.find({})

  console.log(result)
  //return res.json(result)
  
}
