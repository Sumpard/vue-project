export interface Result<T = never> {
  code: int;
  msg: string;
  data: T;
}
