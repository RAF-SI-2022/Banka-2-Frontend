export interface UserModel{
    id: number
    email: string
    firstName: string
    lastName: string
    password: string
    jmbg: number
    phone: number
    jobPosition: string
    active: boolean
    permissions: Permission[]
}
export interface Permission{
    id: number
    permissionName: string
}
