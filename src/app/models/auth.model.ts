import { Permission } from "./users.model"

// TODO: dodati ostale atribute kada back implementira login
export interface LoginResponse {
  token: string
  permissions: Permission[]
}

