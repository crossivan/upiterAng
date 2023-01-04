export interface User {
  email: string
  password: string
}

export interface ServerResponse{
  access_token: string
  expires_in: number
}
