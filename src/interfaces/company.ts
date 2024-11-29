export interface User {
    id: string,
    username: string,
    email: string,
}


export interface Company {
    id: string,
    name: string,
    cnpj: string,
    phoneNumber: string,
    user : User
}