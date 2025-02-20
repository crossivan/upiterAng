import {FormControl} from '@angular/forms';

export interface RitualForm {
  hash_name?: FormControl<string | null>;
  shape: FormControl<boolean>;
  orientation: FormControl<boolean>;
  holes: FormControl<boolean>;
  sizes: FormControl<number>;
  frame: FormControl<number>;
  background: FormControl<number>;
  cross: FormControl<boolean>;
  withText: FormControl<boolean>;
  withoutPhoto: FormControl<boolean>;
  colored: FormControl<boolean>;
  epitaph?: FormControl<string | null>;
  last_name?: FormControl<string | null>;
  first_name?: FormControl<string | null>;
  patronymic?: FormControl<string | null>;
  birthday?: FormControl<Date | null>;
  death?: FormControl<Date | null>;
}

export interface RitualLegend {
  last_name?: string;
  first_name?: string;
  patronymic?: string;
  birthday?: string;
  death?: string;
  epitaph?: string;
}

export interface OrderResponse {
  id: number;
  user_id: number;
  name: string;
  order_number: number;
  user_name: string;
  hash_name: string;
  shape: boolean;
  orientation: boolean;
  holes: boolean;
  sizes: number;
  frame: number;
  background: number;
  cross: boolean;
  // withText: boolean;
  // withoutPhoto: boolean;
  colored: boolean;
  epitaph: string | null;
  last_name: string | null;
  first_name: string | null;
  patronymic: string | null;
  birthday: string | null;
  death: string | null;
  created_at: string;
  // updated_at: string;
  // deleted_at: string | null;
}

export interface DataResponse {
  message: string;
  order: number;
  files: string[] | null;
}

export interface UploadFileResponse {
  message: string;
  hash_name: string;
  path: string;
}

