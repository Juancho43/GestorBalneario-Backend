import { AppResponse } from './AppResponse';

export interface IController<T = any> {
  execute(...arg: any[]): Promise<AppResponse<T>>;
}
