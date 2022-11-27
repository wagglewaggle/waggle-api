export interface IListResponse<T> {
  list: T[];
}

export interface IListCountResponse<T> extends IListResponse<T> {
  count: number;
}
