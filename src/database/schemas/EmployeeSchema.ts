import mongoose from "mongoose";
import { Employee } from "../../interfaces/EmployeeInterface";

const employeeSchema = new mongoose.Schema<Employee>({
    cpf_cnpj_socio: {
        type: String,
        required: true
    },
    nome_socio: {
        type: String,
        required: true
    },
    qualificacao_socio: {
        type: String,
        required: true
    },
    tipo_socio: {
        type: String,
        required: true
    }
})

const Employee = mongoose.model<Employee>('Employee', employeeSchema, 'Employee')

export { Employee, employeeSchema }