export interface ErrorConstructorParams {
  status: number;
  success: boolean;
  message: string;
  errors: string[];
  stack?: string;
}

export interface ResponseConstructorParams {
  success: boolean;
  message: string;
  data?: object;
}
