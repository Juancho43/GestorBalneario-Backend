export interface AppResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  error?: any;
}
