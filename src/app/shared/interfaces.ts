export interface User {
  email: string
  password: string
}

export interface AuthResponse{
  access_token: string
  expires_in: number
  user_name?: string
}

export interface ServerResponseUpload{
  message: string
  hash_name: string
  path: string
}

export interface MyCropperPosition {
  width: number;
  height: number;
  x: number;
  y: number;
}
