export interface User {
  email: string;
  password: string;
}

export interface RegData {
  name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export interface ServerResponseUpload {
  message: string;
  hash_name: string;
  path: string;
}

export interface MyCropperPosition {
  width: number;
  height: number;
  x: number;
  y: number;
}
