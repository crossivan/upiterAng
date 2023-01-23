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
  hash_name: string
  path: string
}

export interface MyCropperPosition {
  width: number;
  height: number;
  x: number;
  y: number;
}
