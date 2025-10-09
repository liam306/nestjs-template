export interface IResponse<T = undefined> {
  message: string;
  data: T;
}

export type PromiseResponse<T = undefined> = Promise<IResponse<T>>;
