export interface Result<T> {
    code: int;
    msg: string;
    data: T;
}