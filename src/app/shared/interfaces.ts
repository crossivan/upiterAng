export interface User {
  email: string
  password: string
}

export interface ServerResponse{
  access_token: string
  expires_in: number
}

export interface ServerResponseUpload{
  message: string
  path: string
}
