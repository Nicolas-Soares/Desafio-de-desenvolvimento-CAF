import mongoose from "mongoose";
import { Company } from "../../interfaces/CompanyInterface";

const companySchema = new mongoose.Schema<Company>({
    cnpj: {
        type: String,
        required: true
    },
    razao_social: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    }
})

const Company = mongoose.model<Company>('Company', companySchema, 'Company')

export { Company, companySchema }