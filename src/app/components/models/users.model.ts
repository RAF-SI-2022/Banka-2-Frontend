export interface User{
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    jmbg: number,
    pozicija: string,

    broj_telefona: string,
    aktivan: number,

    // limit: string, //| null,
    // limit_left: number, // mozda string

    // permissions: Permission[]
    
}
export interface Permission{
    id: number,
    permission_name: string
}