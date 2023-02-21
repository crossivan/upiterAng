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

export interface RitualForm {
  shape: FormControl<boolean>;
  orientation: FormControl<boolean>;
  holes: FormControl<boolean>;
  sizes: FormControl<number>;
  cross: FormControl<boolean>;
  withText: FormControl<boolean>;
  withoutPhoto: FormControl<boolean>;
  epitaph?: FormControl<string | null>;
  lastName?: FormControl<string | null>;
  firstName?: FormControl<string | null>;
  patronymic?: FormControl<string | null>;
  birthday?: FormControl<string | null>;
  death?: FormControl<string | null>;
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
