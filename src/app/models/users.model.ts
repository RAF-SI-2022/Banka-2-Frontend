export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  password: string
  jmbg: string
  phone: string
  jobPosition: string
  active: boolean
  dailyLimit: number
  permissions: Permission[]
}

export interface Permission {
  id: number
  permissionName: string
}

export interface UserCreateDTO {
  firstName: string
  lastName: string
  email: string
  password: string
  permissions: Permission[]
  jobPosition: string
  active: boolean
  jmbg: string
  phone: string
}

export interface Job {
  name: string
  permissions: string []
}


