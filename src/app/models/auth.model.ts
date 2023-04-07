import {Permission} from "./users.model"

export interface LoginResponse {
  token: string
  permissions: Permission[]
}

