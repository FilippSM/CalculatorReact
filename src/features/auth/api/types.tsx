export type Auth = {
  id: number
  login: string
  password: string
}

export type AuthFormData = Pick<Auth, 'login' | 'password'>