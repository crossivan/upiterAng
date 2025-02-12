import {FormControl} from '@angular/forms';

export interface User {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface RegForm {
  name: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  password_confirmation: FormControl<string>;
}

export interface RegResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
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
